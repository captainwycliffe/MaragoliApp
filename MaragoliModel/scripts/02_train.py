"""
02_train.py
Fine-tunes facebook/mbart-large-50-many-to-many-mmt on the Maragoli-English corpus.

Strategy:
  - mBART-50 does not include Maragoli natively.
  - We use 'sw_KE' (Swahili) as the source language token — the closest Bantu
    language available in mBART-50's vocabulary.
  - With ~500 pairs we use aggressive regularization and early stopping.

Usage:
    python scripts/02_train.py
    python scripts/02_train.py --epochs 20 --batch_size 4
"""

import argparse
import json
import os

import torch
from datasets import Dataset
from transformers import (
    MBartForConditionalGeneration,
    MBart50TokenizerFast,
    Seq2SeqTrainer,
    Seq2SeqTrainingArguments,
    EarlyStoppingCallback,
    DataCollatorForSeq2Seq,
)
import sacrebleu

# ── Paths ────────────────────────────────────────────────────────────────────
ROOT      = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR  = os.path.join(ROOT, "data")
MODEL_DIR = os.path.join(ROOT, "models", "mbart-maragoli")

# ── Config ───────────────────────────────────────────────────────────────────
BASE_MODEL   = "facebook/mbart-large-50-many-to-many-mmt"
# Swahili token used as proxy for Maragoli (closest Bantu language in mBART-50)
SRC_LANG     = "sw_KE"
TGT_LANG     = "en_XX"
MAX_SRC_LEN  = 128
MAX_TGT_LEN  = 128


def load_json(path: str) -> list[dict]:
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def tokenize(batch, tokenizer):
    tokenizer.src_lang = SRC_LANG
    model_inputs = tokenizer(
        text=batch["maragoli"],
        text_target=batch["english"],
        max_length=MAX_SRC_LEN,
        max_target_length=MAX_TGT_LEN,
        truncation=True,
        padding=False,
    )
    model_inputs["labels"] = model_inputs["labels"]
    return model_inputs


def compute_metrics(eval_preds, tokenizer):
    preds, labels = eval_preds
    if isinstance(preds, tuple):
        preds = preds[0]

    # Replace -100 padding in labels
    labels = [
        [tok if tok != -100 else tokenizer.pad_token_id for tok in label]
        for label in labels
    ]

    decoded_preds  = tokenizer.batch_decode(preds,   skip_special_tokens=True)
    decoded_labels = tokenizer.batch_decode(labels,  skip_special_tokens=True)

    decoded_preds  = [p.strip() for p in decoded_preds]
    decoded_labels = [[l.strip()] for l in decoded_labels]  # sacrebleu expects list of lists

    result = sacrebleu.corpus_bleu(decoded_preds, list(zip(*decoded_labels)))
    return {"bleu": round(result.score, 2)}


def main(args):
    output_dir = args.output_dir if args.output_dir else MODEL_DIR
    print(f"Output dir: {output_dir}")
    os.makedirs(output_dir, exist_ok=True)

    print(f"Loading tokenizer and model: {BASE_MODEL}")
    tokenizer = MBart50TokenizerFast.from_pretrained(BASE_MODEL)
    tokenizer.src_lang = SRC_LANG

    model = MBartForConditionalGeneration.from_pretrained(BASE_MODEL)

    # Force decoder to start from English token
    # Set on generation_config (not model.config) to avoid ValueError in transformers >= 4.46
    forced_bos_id = tokenizer.lang_code_to_id[TGT_LANG]
    model.generation_config.forced_bos_token_id = forced_bos_id
    model.generation_config.decoder_start_token_id = forced_bos_id

    print("Loading dataset...")
    train_data = load_json(os.path.join(DATA_DIR, "train.json"))
    val_data   = load_json(os.path.join(DATA_DIR, "val.json"))
    print(f"  Train: {len(train_data)}  Val: {len(val_data)}")

    train_ds = Dataset.from_list(train_data)
    val_ds   = Dataset.from_list(val_data)

    print("Tokenizing...")
    train_ds = train_ds.map(
        lambda b: tokenize(b, tokenizer),
        batched=True, remove_columns=["maragoli", "english"]
    )
    val_ds = val_ds.map(
        lambda b: tokenize(b, tokenizer),
        batched=True, remove_columns=["maragoli", "english"]
    )

    data_collator = DataCollatorForSeq2Seq(tokenizer, model=model, padding=True)

    training_args = Seq2SeqTrainingArguments(
        output_dir=output_dir,
        num_train_epochs=args.epochs,
        per_device_train_batch_size=args.batch_size,
        per_device_eval_batch_size=args.batch_size,
        warmup_steps=50,
        weight_decay=0.01,          # regularization — important for small dataset
        logging_steps=10,
        eval_strategy="epoch",
        save_strategy="epoch",
        load_best_model_at_end=True,
        metric_for_best_model="bleu",
        greater_is_better=True,
        predict_with_generate=True,
        generation_max_length=MAX_TGT_LEN,
        fp16=torch.cuda.is_available(),   # use half precision if GPU available
        report_to="none",                 # disable wandb/tensorboard unless needed
        save_total_limit=3,               # keep 3 checkpoints
        save_only_model=True,             # skip optimizer.pt (saves ~4.6 GB per checkpoint)
    )

    # 'processing_class' replaces 'tokenizer' in transformers >= 4.46
    trainer_kwargs = dict(
        model=model,
        args=training_args,
        train_dataset=train_ds,
        eval_dataset=val_ds,
        data_collator=data_collator,
        compute_metrics=lambda p: compute_metrics(p, tokenizer),
        callbacks=[EarlyStoppingCallback(early_stopping_patience=3)],
    )

    import transformers as _tv
    if tuple(int(x) for x in _tv.__version__.split(".")[:2]) >= (4, 46):
        trainer_kwargs["processing_class"] = tokenizer
    else:
        trainer_kwargs["tokenizer"] = tokenizer

    trainer = Seq2SeqTrainer(**trainer_kwargs)

    print(f"\nStarting training  (epochs={args.epochs}, batch={args.batch_size})")
    print(f"Device: {'GPU' if torch.cuda.is_available() else 'CPU'}")
    trainer.train()

    print(f"\nSaving best model to: {output_dir}")
    trainer.save_model(output_dir)
    tokenizer.save_pretrained(output_dir)

    print("\nTraining complete.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--epochs",     type=int, default=20)
    parser.add_argument("--batch_size", type=int, default=4)
    parser.add_argument("--output_dir", type=str, default=None,
                        help="Override output directory (e.g. point directly to Drive)")
    args = parser.parse_args()
    main(args)
