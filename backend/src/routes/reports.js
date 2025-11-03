const express = require('express');
const { db, init } = require('../db');
const router = express.Router();

// GET /api/reports
router.get('/', async (req, res) => {
  await init();
  const reports = db.data.reports || [];
  res.json({ reports });
});

// GET /api/reports/:id
router.get('/:id', async (req, res) => {
  await init();
  const id = req.params.id;
  const report = (db.data.reports || []).find(r => r.id === id);
  if (!report) return res.status(404).json({ error: 'Report not found' });
  res.json({ report });
});

module.exports = router;
