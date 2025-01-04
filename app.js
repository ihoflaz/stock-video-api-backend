var express = require('express');
var cors = require('cors');
require('dotenv').config();

var app = express();

// CORS ayarlarını güncelleyelim
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// API durum kontrolü
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
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
    path: req.path
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Sunucu Hatası:', err);
  res.status(err.status || 500).json({
    error: 'Sunucu hatası',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

module.exports = app;
