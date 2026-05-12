const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// gemini-1.5-flash has the most generous free tier (1500 req/day, 15 req/min)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

module.exports = { model };
