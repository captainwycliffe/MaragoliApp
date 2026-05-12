"""
03_evaluate.py
Evaluates the fine-tuned model on the held-out test set.
Prints BLEU score and shows side-by-side translation examples.

Usage:
    python scripts/03_evaluate.py
    python scripts/03_evaluate.py --model_dir /path/to/checkpoint
"""

import argparse
import json
import os

import torch
import sacrebleu
from transformers import MBartForConditionalGeneration, MBart50TokenizerFast

# ── Paths ────────────────────────────────────────────────────────────────────
ROOT      = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR  = os.path.join(ROOT, "data")
_DEFAULT_MODEL_DIR = os.path.join(ROOT, "models", "mbart-maragoli", "checkpoint-2028")

parser = argparse.ArgumentParser()
parser.add_argument("--model_dir", default=_DEFAULT_MODEL_DIR)
args, _ = parser.parse_known_args()
MODEL_DIR = args.model_dir

SRC_LANG = "sw_KE"
TGT_LANG = "en_XX"
MAX_LEN  = 128


def translate(texts: list[str], model, tokenizer, device) -> list[str]:
    tokenizer.src_lang = SRC_LANG
    inputs = tokenizer(
        texts,
        return_tensors="pt",
        padding=True,
        truncation=True,
        max_length=MAX_LEN,
    ).to(device)

    with torch.no_grad():
        generated = model.generate(
            **inputs,
            forced_bos_token_id=tokenizer.lang_code_to_id[TGT_LANG],
            max_length=MAX_LEN,
            num_beams=4,
        )
    return tokenizer.batch_decode(generated, skip_special_tokens=True)


def main():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Device: {device}")
    print(f"Loading model from: {MODEL_DIR}")

    tokenizer = MBart50TokenizerFast.from_pretrained(MODEL_DIR)
    model = MBartForConditionalGeneration.from_pretrained(MODEL_DIR).to(device)
    model.eval()

    with open(os.path.join(DATA_DIR, "test.json"), encoding="utf-8") as f:
        test_data = json.load(f)

    sources    = [d["maragoli"] for d in test_data]
    references = [d["english"]  for d in test_data]

    print(f"Translating {len(sources)} test sentences...")
    # Batch in groups of 8 to avoid OOM
    predictions = []
    batch_size = 8
    for i in range(0, len(sources), batch_size):
        batch = sources[i:i + batch_size]
        predictions.extend(translate(batch, model, tokenizer, device))

    # BLEU score
    bleu = sacrebleu.corpus_bleu(predictions, [references])
    print(f"\nBLEU score: {bleu.score:.2f}")
    print("(Reference: >10 = usable prototype, >20 = good for a low-resource language)\n")

    # Side-by-side examples
    print("=" * 70)
    print("TRANSLATION EXAMPLES (first 15)")
    print("=" * 70)
    for i, (src, ref, pred) in enumerate(zip(sources, references, predictions)):
        if i >= 15:
            break
        match = "✓" if ref.lower().strip() == pred.lower().strip() else " "
        print(f"\n[{i+1}] {match}")
        print(f"  Maragoli   : {src}")
        print(f"  Reference  : {ref}")
        print(f"  Prediction : {pred}")

    # Error analysis
    exact_matches = sum(
        1 for r, p in zip(references, predictions)
        if r.lower().strip() == p.lower().strip()
    )
    print(f"\nExact matches: {exact_matches}/{len(references)} "
          f"({100*exact_matches/len(references):.1f}%)")


if __name__ == "__main__":
    main()
