// File: routes/admin/search.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
const API_BASE_URL = 'http://localhost:3000';
const requireAdminLogin = require('../../middleware/requireAdminLogin');

// POST /admin/products/search
router.post('/', requireAdminLogin, async (req, res, next) => {
  const config = { headers: { Authorization: `Bearer ${req.session.token}` } };

  try {
    const { name, category, brand } = req.body;

    // Perform search
    const { data: searchData } = await axios.post(
      `${API_BASE_URL}/search`,
      { name, category, brand },
      config
    );
    const products = searchData.results;

    // Fetch brands and categories
    const [ { data: brands }, { data: categories } ] = await Promise.all([
      axios.get(`${API_BASE_URL}/brands`, config),
      axios.get(`${API_BASE_URL}/categories`, config)
    ]);

    // Create lookup maps
    const brandMap = Object.fromEntries(brands.map(b => [b.id, b.name]));
    const categoryMap = Object.fromEntries(categories.map(c => [c.id, c.name]));

    // Combine product data
    const flattened = products.map(p => ({
      ...p,
      Brand:    { name: brandMap[p.BrandId]    || 'Unknown' },
      Category: { name: categoryMap[p.CategoryId] || 'Unknown' }
    }));

    // ✅ FIX: send brands + categories to EJS template
    res.render('admin/products', {
      title: 'Products',
      products: flattened,
      brands,
      categories,
      username: req.session.user.username,
      searchQuery: [name, category, brand].filter(Boolean).join(' ')
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;





