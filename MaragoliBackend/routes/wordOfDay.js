const express = require('express');
const { model } = require('../gemini');

const router = express.Router();

// Simple in-memory cache: regenerate once per day
let cache = { date: null, word: null };

// GET /api/word-of-day
router.get('/', async (req, res) => {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  if (cache.date === today && cache.word) {
    return res.json(cache.word);
  }

  const prompt = `You are a Maragoli (Lulogooli) language expert from Vihiga County, Kenya.

Generate a "Word of the Day" for the Maragoli Translate app. Choose a meaningful, culturally rich Maragoli word.

Respond ONLY with valid JSON in this exact format (no markdown, no extra text):
{
  "word": "<maragoli word>",
  "meaning": "<English meaning / translation>",
  "pronunciation": "<phonetic pronunciation guide>",
  "description": "<1-2 sentences on cultural significance or usage context>",
  "exampleSentence": "<a short example sentence in Maragoli>",
  "exampleTranslation": "<English translation of the example sentence>"
}`;

  try {
    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();
    const jsonString = raw.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
    const parsed = JSON.parse(jsonString);

    cache = { date: today, word: parsed };
    return res.json(parsed);
  } catch (err) {
    console.error('Word of day error:', err);
    return res.status(500).json({ error: 'Could not fetch word of the day.' });
  }
});

module.exports = router;
