const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const FULL_JSON = path.join(__dirname, '..', '..', 'MaragoliModel', 'data', 'full.json');

let _cache = null;

function loadPhrases() {
  if (_cache) return _cache;
  try {
    _cache = JSON.parse(fs.readFileSync(FULL_JSON, 'utf8'));
  } catch {
    _cache = [];
  }
  return _cache;
}

// GET /api/phrases?limit=100&offset=0&q=search
router.get('/', (req, res) => {
  const all = loadPhrases();
  const q = (req.query.q || '').toLowerCase();
  const limit = Math.min(parseInt(req.query.limit) || 100, 500);
  const offset = parseInt(req.query.offset) || 0;

  const filtered = q
    ? all.filter(
        (p) =>
          p.maragoli.toLowerCase().includes(q) ||
          p.english.toLowerCase().includes(q)
      )
    : all;

  res.json({
    phrases: filtered.slice(offset, offset + limit),
    total: filtered.length,
  });
});

module.exports = router;
