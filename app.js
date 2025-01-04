var express = require('express');
var cors = require('cors');
require('dotenv').config();

var app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/pixabay', require('./routes/api/pixabay'));
app.use('/api/pexels', require('./routes/api/pexels'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Sunucu hatası',
    details: err.message
  });
});

module.exports = app;
