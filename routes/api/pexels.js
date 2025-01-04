const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/search', async (req, res) => {
  try {
    const { q = '', page = 1 } = req.query;
    
    if (!process.env.PEXELS_API_KEY) {
      throw new Error('PEXELS_API_KEY environment variable is not set');
    }

    console.log('Pexels API Request:', {
      query: q,
      page: page,
      apiKey: 'Mevcut'
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
    }).catch(error => {
      console.error('Pexels API Error Response:', error.response?.data);
      throw new Error(`Pexels API Error: ${error.response?.data?.error || error.message}`);
    });

    console.log('Pexels API Response:', {
      total_results: response.data.total_results,
      page: response.data.page,
      videosCount: response.data.videos?.length
    });

    if (!response.data || !Array.isArray(response.data.videos)) {
      throw new Error('Invalid API response format');
    }

    res.json({
      videos: response.data.videos,
      total_results: response.data.total_results,
      page: parseInt(page),
      per_page: response.data.per_page || 20
    });

  } catch (error) {
    console.error('Pexels Search Error:', error);
    res.status(error.response?.status || 500).json({ 
      error: 'Pexels API\'ye erişirken bir hata oluştu',
      message: error.message,
      details: error.response?.data
    });
  }
});

module.exports = router; 