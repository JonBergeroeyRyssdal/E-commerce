// File: routes/admin/products.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const API_BASE_URL = 'http://localhost:3000';
const requireAdminLogin = require('../../middleware/requireAdminLogin');

// GET /admin/products
router.get('/', requireAdminLogin, async (req, res) => {
  try {
    const config = { headers: { Authorization: `Bearer ${req.session.token}` } };
    // Fetch products, brands, and categories in parallel
    const [productsRes, brandsRes, categoriesRes] = await Promise.all([
      axios.get(`${API_BASE_URL}/products`, config),
      axios.get(`${API_BASE_URL}/brands`, config),
      axios.get(`${API_BASE_URL}/categories`, config)
    ]);

    res.render('admin/products', {
      products: productsRes.data,
      brands: brandsRes.data,
      categories: categoriesRes.data,
      username: req.session.user.username
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Could not fetch products', error });
  }
});

// GET /admin/products/new
router.get('/new', requireAdminLogin, async (req, res) => {
  try {
    const config = { headers: { Authorization: `Bearer ${req.session.token}` } };
    const [brandsRes, categoriesRes] = await Promise.all([
      axios.get(`${API_BASE_URL}/brands`, config),
      axios.get(`${API_BASE_URL}/categories`, config)
    ]);
    res.render('admin/productForm', {
      product: null,
      brands: brandsRes.data,
      categories: categoriesRes.data
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Could not load form data', error });
  }
});

// POST /admin/products
router.post('/', requireAdminLogin, async (req, res) => {
  try {
    await axios.post(`${API_BASE_URL}/products`, req.body, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.redirect('/admin/products');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Could not create product', error });
  }
});

// GET /admin/products/:id/edit
router.get('/:id/edit', requireAdminLogin, async (req, res) => {
  try {
    const config = { headers: { Authorization: `Bearer ${req.session.token}` } };
    const [productRes, brandsRes, categoriesRes] = await Promise.all([
      axios.get(`${API_BASE_URL}/products/${req.params.id}`, config),
      axios.get(`${API_BASE_URL}/brands`, config),
      axios.get(`${API_BASE_URL}/categories`, config)
    ]);
    res.render('admin/productForm', {
      product: productRes.data,
      brands: brandsRes.data,
      categories: categoriesRes.data
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Could not load product data', error });
  }
});

// PUT /admin/products/:id
router.put('/:id', requireAdminLogin, async (req, res) => {
  try {
    await axios.put(`${API_BASE_URL}/products/${req.params.id}`, req.body, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.redirect('/admin/products');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Could not update product', error });
  }
});

// POST /admin/products/:id/toggle
router.post('/:id/toggle', requireAdminLogin, async (req, res) => {
  try {
    const config = { headers: { Authorization: `Bearer ${req.session.token}` } };

    // Hent eksisterende produkt
    const productRes = await axios.get(`${API_BASE_URL}/products/${req.params.id}`, config);
    const product = productRes.data;

    // Endre status (soft delete toggle)
    await axios.put(
      `${API_BASE_URL}/products/${req.params.id}`,
      { isDeleted: !product.isDeleted },
      config
    );

    res.redirect('/admin/products');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Could not toggle product status', error });
  }
});


module.exports = router;






