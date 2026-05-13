const express = require('express');
const { generate } = require('../anthropic');

const LOCAL_MODEL_URL = process.env.LOCAL_MODEL_URL || 'http://localhost:5000';

// Attempt translation via the local fine-tuned mBART model.
// Returns null only if the model server is unreachable or the model is not loaded.
async function tryLocalModel(text) {
  try {
    const res = await fetch(`${LOCAL_MODEL_URL}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, direction: 'maragoli_to_english' }),
      signal: AbortSignal.timeout(60000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    // Fall back to API only when model is not loaded at all
    if (data.source === 'unavailable') return null;
    return data;
  } catch {
    return null;   // model server not running — fall through to API
  }
}

const router = express.Router();

// POST /api/translate
// Body: { text: string, from: "maragoli"|"english", to: "maragoli"|"english" }
router.post('/', async (req, res) => {
  const { text, from = 'maragoli', to = 'english' } = req.body;

  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ error: 'text is required.' });
  }

  if (text.trim().length > 2000) {
    return res.status(400).json({ error: 'text must be 2000 characters or fewer.' });
  }

  const fromLabel = from === 'maragoli' ? 'Maragoli (Lulogooli)' : 'English';
  const toLabel   = to   === 'maragoli' ? 'Maragoli (Lulogooli)' : 'English';

  const prompt = `You are an expert translator specializing in the Maragoli (Lulogooli) language spoken in Vihiga County, Kenya.

Translate the following text from ${fromLabel} to ${toLabel}.

Rules:
- Preserve the cultural meaning and tone, not just the literal words.
- If the input contains Maragoli proverbs or idioms, explain the cultural meaning in the notes field.
- Respond ONLY with valid JSON in this exact format (no markdown, no extra text):
{
  "translation": "<translated text>",
  "notes": "<brief cultural or linguistic note, or empty string if none>",
  "wordBreakdown": [
    { "word": "<source word>", "meaning": "<meaning>" }
  ]
}

Text to translate:
"${text.trim()}"`;

  // Try local model first (maragoli→english only); skip for english→maragoli
  if (from === 'maragoli' && to === 'english') {
    const local = await tryLocalModel(text.trim());
    if (local) {
      return res.json({
        translation: local.translation,
        notes: '',
        wordBreakdown: [],
        from,
        to,
        source: local.source,   // "exact_match" | "model"
      });
    }
  }

  try {
    const raw = await generate(prompt);
    const jsonString = raw.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
    const parsed = JSON.parse(jsonString);

    return res.json({
      translation: parsed.translation || '',
      notes: parsed.notes || '',
      wordBreakdown: Array.isArray(parsed.wordBreakdown) ? parsed.wordBreakdown : [],
      from,
      to,
    });
  } catch (err) {
    console.error('Translation error:', err);
    return res.status(500).json({ error: 'Translation failed. Please try again.' });
  }
});

module.exports = router;
