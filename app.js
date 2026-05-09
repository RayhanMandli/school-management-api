'use strict';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initDB } = require('./config/db');
const schoolRoutes = require('./routes/schoolRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Global Middleware ────────────────────────────────────────────────────────

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────────────────────

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'School Management API is running.',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────

app.use('/', schoolRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

// ─── Centralised Error Handler ────────────────────────────────────────────────

// Must have 4 parameters so Express recognises it as an error handler.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('❌  Unhandled error:', err.stack || err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An unexpected internal server error occurred.',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ─── Bootstrap ────────────────────────────────────────────────────────────────

const start = async () => {
  await initDB(); // Ensure DB is ready before accepting traffic

  app.listen(PORT, () => {
    console.log('');
    console.log('╔══════════════════════════════════════════╗');
    console.log('║      School Management API  v1.0.0       ║');
    console.log('╠══════════════════════════════════════════╣');
    console.log(`║  🚀  Server   : http://localhost:${PORT}     ║`);
    console.log(`║  🌍  Env      : ${(process.env.NODE_ENV || 'development').padEnd(25)}║`);
    console.log('╚══════════════════════════════════════════╝');
    console.log('');
  });
};

start();
