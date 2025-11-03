const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { nanoid } = require('nanoid');
const { db, init } = require('../db');

const router = express.Router();

const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const id = nanoid();
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${id}${ext}`);
  }
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// POST /api/upload
router.post('/', upload.single('file'), async (req, res) => {
  await init();
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const { originalname, filename, size, mimetype } = req.file;
    const { patientName = null, notes = null } = req.body || {};

    const report = {
      id: nanoid(),
      originalName: originalname,
      fileName: filename,
      url: `/uploads/${filename}`,
      size,
      mimetype,
      patientName,
      notes,
      createdAt: new Date().toISOString()
    };

    db.data.reports.unshift(report);
    await db.write();

    return res.status(201).json({ report });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
