var express = require('express');
var cors = require('cors');
require('dotenv').config();

var app = express();

// CORS ayarları
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Stock Video API is running' });
});

// API durum kontrolü
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: {
      pixabayKey: process.env.PIXABAY_API_KEY ? 'Mevcut' : 'Eksik',
      pexelsKey: process.env.PEXELS_API_KEY ? 'Mevcut' : 'Eksik'
    }
  });
});

// API routes
app.use('/api/pixabay', require('./routes/api/pixabay'));
app.use('/api/pexels', require('./routes/api/pexels'));

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Endpoint bulunamadı',
    path: req.path,
    method: req.method
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Sunucu Hatası:', err);
  res.status(err.status || 500).json({
    error: 'Sunucu hatası',
    message: err.message,
    path: req.path,
    method: req.method
  });
});

module.exports = app;
