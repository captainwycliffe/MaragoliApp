"""
04_retrain.py
Merges new corpus data with existing data and retrains from the last checkpoint.
Accepts one or multiple Excel files at once — merges all before retraining.

Usage:
    python scripts/04_retrain.py --new_excel file1.xlsx file2.xlsx file3.xlsx
"""

import argparse
import json
import os
import sys

# Reuse helpers from 01_prepare_data
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from importlib import import_module
prepare = import_module("01_prepare_data")

ROOT     = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(ROOT, "data")


def merge_and_save(excel_files: list) -> int:
    # Load existing full dataset
    full_path = os.path.join(DATA_DIR, "full.json")
    if not os.path.exists(full_path):
        raise FileNotFoundError(
            "full.json not found. Run 01_prepare_data.py first."
        )
    with open(full_path, encoding="utf-8") as f:
        existing = json.load(f)

    existing_keys = {(d["maragoli"], d["english"]) for d in existing}
    print(f"Existing corpus: {len(existing)} pairs")

    # Merge every Excel file
    total_added = 0
    for excel_path in excel_files:
        print(f"\nMerging: {excel_path}")
        new_df = prepare.load_and_clean(excel_path)
        new_records = new_df[["maragoli", "english"]].to_dict(orient="records")

        added = 0
        for rec in new_records:
            key = (rec["maragoli"], rec["english"])
            if key not in existing_keys:
                existing.append(rec)
                existing_keys.add(key)
                added += 1
        print(f"  New pairs added from this file: {added}")
        total_added += added

    print(f"\nTotal new pairs added: {total_added}")
    print(f"Combined corpus: {len(existing)} pairs")

    # Save updated full.json
    with open(full_path, "w", encoding="utf-8") as f:
        json.dump(existing, f, ensure_ascii=False, indent=2)

    return len(existing)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--new_excel", required=True, nargs="+",
        help="One or more Excel (.xlsx) or CSV (.csv) files: --new_excel file1.xlsx file2.csv"
    )
    parser.add_argument("--epochs",     type=int, default=10)
    parser.add_argument("--batch_size", type=int, default=4)
    args = parser.parse_args()

    total = merge_and_save(args.new_excel)  # args.new_excel is now a list

    if total < 100:
        print("Warning: corpus is still very small. Consider collecting more data first.")

    # Re-run data preparation on the merged full.json to regenerate splits
    import pandas as pd
    with open(os.path.join(DATA_DIR, "full.json"), encoding="utf-8") as f:
        data = json.load(f)
    df = pd.DataFrame(data)
    if "category" not in df.columns:
        df["category"] = "general"
    prepare.split_and_save(df)

    # Re-run training (warm start from existing model checkpoint if available)
    import subprocess
    model_dir = os.path.join(ROOT, "models", "mbart-maragoli")
    checkpoint_flag = []
    if os.path.exists(model_dir):
        print(f"\nWarm-starting from existing model: {model_dir}")
        # Pass checkpoint to training script via env so 02_train can pick it up
        os.environ["MBART_CHECKPOINT"] = model_dir
    else:
        print("\nNo existing checkpoint found — training from base mBART-50.")

    train_script = os.path.join(os.path.dirname(__file__), "02_train.py")
    subprocess.run(
        [sys.executable, train_script,
         "--epochs", str(args.epochs),
         "--batch_size", str(args.batch_size)],
        check=True
    )


if __name__ == "__main__":
    main()
