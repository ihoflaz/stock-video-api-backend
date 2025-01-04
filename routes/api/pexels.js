const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/search', async (req, res) => {
  try {
    const { q = '', page = 1 } = req.query;
    
    console.log('Pexels API Request:', {
      query: q,
      page: page,
      apiKey: process.env.PEXELS_API_KEY ? 'Mevcut' : 'Eksik'
    });

    const response = await axios.get('https://api.pexels.com/videos/search', {
      headers: {
        'Authorization': process.env.PEXELS_API_KEY
      },
      params: {
        query: q,
        page: page,
        per_page: 20
      }
    });

    console.log('Pexels API Response:', response.data);

    if (!response.data || !response.data.videos) {
      return res.status(500).json({
        error: 'Geçersiz API yanıtı',
        videos: [],
        total_results: 0
      });
    }

    res.json({
      videos: response.data.videos || [],
      total_results: response.data.total_results || 0,
      page: parseInt(page),
      per_page: response.data.per_page || 20
    });

  } catch (error) {
    console.error('Pexels API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Pexels API\'ye erişirken bir hata oluştu',
      details: error.message,
      videos: [],
      total_results: 0
    });
  }
});

module.exports = router; 