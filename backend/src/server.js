const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const uploadRouter = require('./routes/upload');
const reportsRouter = require('./routes/reports');
const assistantRouter = require('./routes/assistant');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API routes
app.use('/api/upload', uploadRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/assistant', assistantRouter);

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Serve frontend build if present
const buildPath = path.join(__dirname, '..', '..', 'build');
app.use(express.static(buildPath));
app.get('*', (req, res, next) => {
  // If a static file for the path exists, let express serve it.
  // Otherwise return 404 for API paths and index.html for others.
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next();
  res.sendFile(path.join(buildPath, 'index.html'), (err) => {
    if (err) {
      res.status(404).send('Not found');
    }
  });
});

app.listen(PORT, () => {
  console.log(`CuraSense backend listening on http://localhost:${PORT}`);
});
