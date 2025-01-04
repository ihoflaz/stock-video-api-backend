const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/search', async (req, res) => {
  try {
    const { q = '', page = 1 } = req.query;
    
    if (!process.env.PIXABAY_API_KEY) {
      throw new Error('PIXABAY_API_KEY environment variable is not set');
    }

    console.log('Pixabay API Request:', {
      query: q,
      page: page,
      apiKey: 'Mevcut'
    });

    const response = await axios.get('https://pixabay.com/api/videos/', {
      params: {
        key: process.env.PIXABAY_API_KEY,
        q: q,
        page: page,
        per_page: 20
      }
    }).catch(error => {
      console.error('Pixabay API Error Response:', error.response?.data);
      throw new Error(`Pixabay API Error: ${error.response?.data?.message || error.message}`);
    });

    console.log('Pixabay API Response:', {
      totalHits: response.data.totalHits,
      total: response.data.total,
      hitsCount: response.data.hits?.length
    });

    if (!response.data || !Array.isArray(response.data.hits)) {
      throw new Error('Invalid API response format');
    }

    res.json({
      hits: response.data.hits,
      totalHits: response.data.totalHits,
      total: response.data.total
    });

  } catch (error) {
    console.error('Pixabay Search Error:', error);
    res.status(error.response?.status || 500).json({ 
      error: 'Pixabay API\'ye erişirken bir hata oluştu',
      message: error.message,
      details: error.response?.data
    });
  }
});

module.exports = router; 