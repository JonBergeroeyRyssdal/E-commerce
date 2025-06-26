// File: routes/admin/categories.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
const API_BASE_URL = 'http://localhost:3000';
const requireAdminLogin = require('../../middleware/requireAdminLogin');

// GET /admin/categories
router.get('/', requireAdminLogin, async (req, res) => {
  try {
    const { data: categories } = await axios.get(`${API_BASE_URL}/categories`, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.render('admin/categories', { categories });
  } catch (error) {
    console.error(error);
    res.status(500).render('admin/categories', {
      categories: [],
      error: 'Could not fetch categories'
    });
  }
});

// GET /admin/categories/new
router.get('/new', requireAdminLogin, (req, res) => {
  res.render('admin/categoryForm', { category: null });
});

// POST /admin/categories
router.post('/', requireAdminLogin, async (req, res) => {
  try {
    await axios.post(`${API_BASE_URL}/categories`, req.body, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.redirect('/admin/categories');
  } catch (error) {
    console.error(error);
    res.status(500).redirect('/admin/categories');
  }
});

// GET /admin/categories/:id/edit
router.get('/:id/edit', requireAdminLogin, async (req, res) => {
  try {
    const { data: categories } = await axios.get(`${API_BASE_URL}/categories`, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    const category = categories.find(c => c.id === parseInt(req.params.id, 10));
    if (!category) {
      return res.status(404).render('error', { message: 'Category not found' });
    }
    res.render('admin/categoryForm', { category });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      message: 'Could not load category',
      error
    });
  }
});

// PUT /admin/categories/:id
router.put('/:id', requireAdminLogin, async (req, res) => {
  try {
    await axios.put(`${API_BASE_URL}/categories/${req.params.id}`, req.body, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.redirect('/admin/categories');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      message: 'Could not update category',
      error
    });
  }
});

// DELETE /admin/categories/:id
router.delete('/:id', requireAdminLogin, async (req, res) => {
  try {
    await axios.delete(`${API_BASE_URL}/categories/${req.params.id}`, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.redirect('/admin/categories');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', {
      message: 'Could not delete category',
      error
    });
  }
});

module.exports = router;

