require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const translateRouter = require('./routes/translate');
const wordOfDayRouter = require('./routes/wordOfDay');
const contributeRouter = require('./routes/contribute');
const phrasesRouter = require('./routes/phrases');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Rate limit: max 30 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: 'Too many requests. Please wait a moment.' },
});
app.use('/api/', limiter);

// ── Routes ──────────────────────────────────────────────────
app.use('/api/translate', translateRouter);
app.use('/api/word-of-day', wordOfDayRouter);
app.use('/api/contribute', contributeRouter);
app.use('/api/phrases', phrasesRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'Maragoli Translate API' });
});

// ── Error handler ───────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
});

app.listen(PORT, () => {
  console.log(`Maragoli backend running on port ${PORT}`);
});
