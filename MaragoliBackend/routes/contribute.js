const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const DATA_FILE = path.join(__dirname, '../data/contributions.json');

// Ensure data directory exists
function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}

// POST /api/contribute
// Body: { maragoli: string, english: string, contributor?: string }
router.post('/', (req, res) => {
  const { maragoli, english, contributor } = req.body;

  if (!maragoli || !english) {
    return res.status(400).json({ error: 'Both maragoli and english fields are required.' });
  }

  if (typeof maragoli !== 'string' || typeof english !== 'string') {
    return res.status(400).json({ error: 'Invalid input.' });
  }

  try {
    ensureDataFile();
    const existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const entry = {
      id: Date.now(),
      maragoli: maragoli.trim(),
      english: english.trim(),
      contributor: contributor ? String(contributor).trim().slice(0, 100) : 'Anonymous',
      submittedAt: new Date().toISOString(),
    };
    existing.push(entry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2), 'utf8');
    return res.status(201).json({ success: true, id: entry.id });
  } catch (err) {
    console.error('Contribute error:', err);
    return res.status(500).json({ error: 'Could not save contribution.' });
  }
});

// GET /api/contribute — list all contributions (for admin review)
router.get('/', (req, res) => {
  try {
    ensureDataFile();
    const entries = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return res.json(entries);
  } catch (err) {
    return res.status(500).json({ error: 'Could not read contributions.' });
  }
});

module.exports = router;
