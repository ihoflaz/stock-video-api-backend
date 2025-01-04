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

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ 
      error: 'Pixabay API\'ye erişirken bir hata oluştu',
      details: error.message 
    });
  }
});

module.exports = router; 