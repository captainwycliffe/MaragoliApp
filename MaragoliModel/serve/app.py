"""
serve/app.py
FastAPI service that wraps the fine-tuned mBART model.
The Node.js backend calls this before falling back to Gemini.

Run:
    uvicorn serve.app:app --host 0.0.0.0 --port 5000 --reload
    (from the MaragoliModel/ directory)
"""

import json
import os
from contextlib import asynccontextmanager

import torch
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import MBartForConditionalGeneration, MBart50TokenizerFast

# ── Paths ────────────────────────────────────────────────────────────────────
_HERE     = os.path.dirname(os.path.abspath(__file__))
ROOT      = os.path.dirname(_HERE)

# full.json lives next to app.py in production (Docker) or in ROOT/data locally
_local_data = os.path.join(_HERE, "full.json")
_root_data  = os.path.join(ROOT, "data", "full.json")
FULL_JSON   = _local_data if os.path.exists(_local_data) else _root_data

# If MODEL_REPO is set (e.g. "yecliffe/mbart-maragoli"), load from HF Hub.
# Otherwise fall back to the local checkpoint directory.
MODEL_REPO = os.environ.get("MODEL_REPO", "")
MODEL_DIR  = MODEL_REPO if MODEL_REPO else os.path.join(ROOT, "models", "mbart-maragoli", "checkpoint-2028")

SRC_LANG = "sw_KE"
TGT_LANG = "en_XX"
MAX_LEN  = 128

# Global model/tokenizer (loaded once at startup)
_state: dict = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    local_missing = not MODEL_REPO and not os.path.exists(MODEL_DIR)
    if local_missing:
        print(f"WARNING: No trained model found at {MODEL_DIR}")
        print("Run scripts/02_train.py first or set MODEL_REPO env var. Serving in lookup-only mode.")
        _state["model"] = None
        _state["tokenizer"] = None
    else:
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        source = f"HF Hub ({MODEL_REPO})" if MODEL_REPO else MODEL_DIR
        print(f"Loading model from {source}  (device: {device})")
        tokenizer = MBart50TokenizerFast.from_pretrained(MODEL_DIR)
        model = MBartForConditionalGeneration.from_pretrained(MODEL_DIR).to(device)
        model.eval()
        _state["model"] = model
        _state["tokenizer"] = tokenizer
        _state["device"] = device
        print("Model ready.")

    # Load phrase lookup table from training data for exact-match fallback
    lookup = {}
    if os.path.exists(FULL_JSON):
        with open(FULL_JSON, encoding="utf-8") as f:
            for pair in json.load(f):
                lookup[pair["maragoli"].strip().lower()] = pair["english"]
    _state["lookup"] = lookup
    print(f"Lookup table loaded: {len(lookup)} entries")

    yield  # app runs here

    _state.clear()


app = FastAPI(title="Maragoli Translate API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request / Response schemas ───────────────────────────────────────────────
class TranslateRequest(BaseModel):
    text: str
    direction: str = "maragoli_to_english"   # only direction supported for now


class TranslateResponse(BaseModel):
    translation: str
    source: str       # "exact_match" | "model" | "unavailable"
    confidence: str   # "high" | "medium" | "low"


# ── Endpoints ────────────────────────────────────────────────────────────────
@app.get("/")
def health():
    return {
        "status": "ok",
        "model_loaded": _state.get("model") is not None,
        "lookup_entries": len(_state.get("lookup", {})),
    }


@app.post("/translate", response_model=TranslateResponse)
def translate(req: TranslateRequest):
    text = req.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="text is required")
    if len(text) > 1000:
        raise HTTPException(status_code=400, detail="text must be 1000 chars or fewer")

    # 1. Exact match lookup (highest confidence)
    lookup = _state.get("lookup", {})
    if text.lower() in lookup:
        return TranslateResponse(
            translation=lookup[text.lower()],
            source="exact_match",
            confidence="high",
        )

    # 2. Model translation
    model     = _state.get("model")
    tokenizer = _state.get("tokenizer")
    device    = _state.get("device", "cpu")

    if model is None:
        return TranslateResponse(
            translation="",
            source="unavailable",
            confidence="low",
        )

    tokenizer.src_lang = SRC_LANG
    inputs = tokenizer(
        text,
        return_tensors="pt",
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

    translation = tokenizer.decode(generated[0], skip_special_tokens=True).strip()
    print(f"[DEBUG] input='{text}' | tokens={generated[0][:8].tolist()} | output='{translation}'")

    return TranslateResponse(
        translation=translation,
        source="model",
        confidence="medium",
    )


@app.get("/lookup")
def lookup_all():
    """Return the full phrase lookup table (useful for offline mode in the app)."""
    return {"phrases": _state.get("lookup", {}), "count": len(_state.get("lookup", {}))}


# ── Gradio UI (only mounted on HF Spaces, optional locally) ──────────────────
try:
    import gradio as gr

    def _translate_ui(text):
        lookup = _state.get("lookup", {})
        if text.strip().lower() in lookup:
            return lookup[text.strip().lower()]
        model = _state.get("model")
        if model is None:
            return "Model not loaded."
        tokenizer = _state.get("tokenizer")
        device = _state.get("device", "cpu")
        tokenizer.src_lang = SRC_LANG
        inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=MAX_LEN).to(device)
        with torch.no_grad():
            generated = model.generate(**inputs, forced_bos_token_id=tokenizer.lang_code_to_id[TGT_LANG], max_length=MAX_LEN, num_beams=4)
        return tokenizer.decode(generated[0], skip_special_tokens=True).strip()

    _demo = gr.Interface(
        fn=_translate_ui,
        inputs=gr.Textbox(label="Maragoli text"),
        outputs=gr.Textbox(label="English translation"),
        title="Maragoli Translate",
        description="Fine-tuned mBART-50 model for Maragoli (Lulogooli) → English translation.",
    )

    app = gr.mount_gradio_app(app, _demo, path="/ui")
except ImportError:
    pass  # Gradio not installed — API endpoints still fully available
