"""
01_prepare_data.py
Loads the Excel corpus, cleans it, and splits into train/val/test JSON files.

Usage:
    python scripts/01_prepare_data.py --excel "path/to/file.xlsx"
    python scripts/01_prepare_data.py  (uses default path)
"""

import argparse
import json
import os
import re
import random
import pandas as pd

try:
    from sklearn.model_selection import train_test_split
    _SKLEARN = True
except ImportError:
    _SKLEARN = False

# ── Paths ────────────────────────────────────────────────────────────────────
ROOT        = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_XLS = os.path.join(ROOT, "..", "Logooli_English_Training_Phrases (2).xlsx")
DATA_DIR    = os.path.join(ROOT, "data")
RAW_DIR     = os.path.join(DATA_DIR, "raw")

# Train / val / test split ratios
TRAIN_RATIO = 0.76
VAL_RATIO   = 0.12
TEST_RATIO  = 0.12   # remainder


def clean_text(text: str) -> str:
    text = str(text).strip()
    # Collapse multiple spaces
    text = re.sub(r" {2,}", " ", text)
    return text


def load_and_clean(file_path: str) -> pd.DataFrame:
    print(f"Loading: {file_path}")
    ext = os.path.splitext(file_path)[1].lower()
    if ext == ".csv":
        df = pd.read_csv(file_path)
    else:
        df = pd.read_excel(file_path)

    # Rename columns to standard names using substring matching (handles varied naming)
    col_map = {}
    MARAGOLI_KEYS = ("logooli", "maragoli", "lulogooli", "source")
    ENGLISH_KEYS  = ("english",)
    CATEGORY_KEYS = ("category", "cat", "type")

    for col in df.columns:
        low = col.strip().lower()
        if any(k in low for k in MARAGOLI_KEYS) and "english" not in low and "file" not in low:
            col_map[col] = "maragoli"
        elif any(k in low for k in ENGLISH_KEYS) and "maragoli" not in low and "lulogooli" not in low:
            col_map[col] = "english"
        elif any(k in low for k in CATEGORY_KEYS):
            col_map[col] = "category"
    df = df.rename(columns=col_map)

    required = {"maragoli", "english"}
    missing = required - set(df.columns)
    if missing:
        raise ValueError(f"Could not find columns: {missing}. Found: {df.columns.tolist()}")

    # Clean text
    df["maragoli"] = df["maragoli"].apply(clean_text)
    df["english"]  = df["english"].apply(clean_text)

    # Drop rows where either side is empty after cleaning
    before = len(df)
    df = df[df["maragoli"].str.len() > 0]
    df = df[df["english"].str.len() > 0]

    # Drop exact duplicates on (maragoli, english) pair
    df = df.drop_duplicates(subset=["maragoli", "english"])
    after = len(df)

    print(f"  Rows after cleaning: {after}  (dropped {before - after})")

    if "category" not in df.columns:
        df["category"] = "general"

    return df[["maragoli", "english", "category"]].reset_index(drop=True)


def split_and_save(df: pd.DataFrame) -> None:
    os.makedirs(DATA_DIR, exist_ok=True)

    if _SKLEARN:
        # Stratify by category so every split has all categories
        train_df, temp_df = train_test_split(
            df, test_size=(VAL_RATIO + TEST_RATIO), random_state=42,
            stratify=df["category"]
        )
        val_df, test_df = train_test_split(
            temp_df, test_size=TEST_RATIO / (VAL_RATIO + TEST_RATIO), random_state=42,
            stratify=temp_df["category"]
        )
    else:
        # Fallback: simple random shuffle split without stratification
        print("  (scikit-learn not found — using simple random split)")
        shuffled = df.sample(frac=1, random_state=42).reset_index(drop=True)
        n = len(shuffled)
        n_train = int(n * TRAIN_RATIO)
        n_val   = int(n * VAL_RATIO)
        train_df = shuffled.iloc[:n_train]
        val_df   = shuffled.iloc[n_train:n_train + n_val]
        test_df  = shuffled.iloc[n_train + n_val:]

    splits = {"train": train_df, "val": val_df, "test": test_df}
    for name, split_df in splits.items():
        out_path = os.path.join(DATA_DIR, f"{name}.json")
        records = split_df[["maragoli", "english"]].to_dict(orient="records")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(records, f, ensure_ascii=False, indent=2)
        print(f"  Saved {name}.json  ({len(records)} pairs)")

    # Also save a combined full dataset for retraining later
    full_path = os.path.join(DATA_DIR, "full.json")
    records = df[["maragoli", "english"]].to_dict(orient="records")
    with open(full_path, "w", encoding="utf-8") as f:
        json.dump(records, f, ensure_ascii=False, indent=2)
    print(f"  Saved full.json   ({len(records)} pairs)")

    print("\nCategory distribution:")
    for name, split_df in splits.items():
        print(f"  {name:5s}: {dict(split_df['category'].value_counts())}")


def print_stats(df: pd.DataFrame) -> None:
    print(f"\nCorpus summary:")
    print(f"  Total pairs  : {len(df)}")
    print(f"  Categories   : {dict(df['category'].value_counts())}")
    print(f"  Avg Maragoli : {df['maragoli'].str.len().mean():.1f} chars")
    print(f"  Avg English  : {df['english'].str.len().mean():.1f} chars")
    print(f"\nSample pairs:")
    for _, row in df.sample(5, random_state=1).iterrows():
        print(f"  [{row['category']}]")
        print(f"    Maragoli : {row['maragoli']}")
        print(f"    English  : {row['english']}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--excel", default=DEFAULT_XLS, help="Path to Excel corpus file")
    args = parser.parse_args()

    df = load_and_clean(args.excel)
    print_stats(df)
    split_and_save(df)
    print("\nData preparation complete.")
