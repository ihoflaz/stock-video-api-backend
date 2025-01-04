const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/search', async (req, res) => {
  try {
    const { q = '', page = 1 } = req.query;
    
    const response = await axios.get('https://pixabay.com/api/videos/', {
      params: {
        key: process.env.PIXABAY_API_KEY,
        q: q,
        page: page,
        per_page: 20
      }
    });

    console.log('Pixabay API Response:', response.data);

    if (!response.data || !response.data.hits) {
      return res.status(500).json({
        error: 'Geçersiz API yanıtı',
        hits: [],
        totalHits: 0
      });
    }

    res.json({
      hits: response.data.hits || [],
      totalHits: response.data.totalHits || 0,
      total: response.data.total || 0
    });

  } catch (error) {
    console.error('Pixabay API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Pixabay API\'ye erişirken bir hata oluştu',
      details: error.message,
      hits: [],
      totalHits: 0
    });
  }
});

module.exports = router; 