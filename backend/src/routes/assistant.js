const express = require('express');
const { nanoid } = require('nanoid');
const router = express.Router();

// POST /api/assistant
// Receives { question } and returns a simple canned/mocked response.
// This can be replaced with a real AI provider (OpenAI, Anthropic, etc.) later.
router.post('/', async (req, res) => {
  const { question } = req.body || {};
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Question is required' });
  }

  // Very small rule-based responder for demo
  const q = question.toLowerCase();
  let answer = "Sorry, I don't know the answer to that yet.";

  if (q.includes('paracetamol') && q.includes('warfarin')) {
    answer = 'Paracetamol is generally preferred; keep total dose under 2–3 g/day and consult your doctor.';
  } else if (q.includes('interact') || q.includes('interaction')) {
    answer = 'Drug interactions depend on many factors — provide the active substances and dosing for a better reply.';
  } else if (q.includes('hello') || q.includes('hi')) {
    answer = 'Hi — how can I help with your medication question today?';
  }

  // Return a small chat object
  const chat = {
    id: nanoid(),
    question,
    answer,
    createdAt: new Date().toISOString()
  };

  res.json({ chat });
});

module.exports = router;
