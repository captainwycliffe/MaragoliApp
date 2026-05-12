# MaragoliModel

Fine-tuned mBART-50 translation model for Maragoli (Lulogooli) → English.

## Setup

```bash
pip install -r requirements.txt
```

## Workflow

### Step 1 — Prepare data
```bash
python scripts/01_prepare_data.py
# Reads the Excel corpus and outputs data/train.json, val.json, test.json
```

### Step 2 — Train
```bash
python scripts/02_train.py
# Downloads mBART-50, fine-tunes on Maragoli corpus, saves to models/mbart-maragoli/
# ~30 min on GPU, ~several hours on CPU
```

### Step 3 — Evaluate
```bash
python scripts/03_evaluate.py
# Prints BLEU score and 15 side-by-side translation examples
```

### Step 4 — Serve
```bash
uvicorn serve.app:app --host 0.0.0.0 --port 5000
# FastAPI endpoint at http://localhost:5000/translate
```

## Adding new corpus data (team workflow)

When teammates have collected new phrases:
```bash
python scripts/04_retrain.py --new_excel "path/to/new_phrases.xlsx"
# Merges new data with existing corpus and retrains from checkpoint
```

## Integration with Node.js backend

The Node.js backend (`MaragoliBackend/routes/translate.js`) calls this service
at `http://localhost:5000/translate` before falling back to Gemini.

## Notes

- Maragoli is not natively in mBART-50's 50 languages.
  We use `sw_KE` (Swahili) as the source language token — the closest Bantu language available.
- With ~500 pairs expect BLEU ~10–18. Performance improves significantly at 1000+ pairs.
- The `/lookup` endpoint returns all training phrases for the app's offline mode.
