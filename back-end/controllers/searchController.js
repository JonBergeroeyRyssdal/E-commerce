const searchService = require('../services/searchService');

exports.searchProducts = async (req, res) => {
  try {
    const results = await searchService.searchProducts(req.body);
    res.json({
      results,
      count: results.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Search failed' });
  }
};




