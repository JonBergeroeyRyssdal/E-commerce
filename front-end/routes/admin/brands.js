// File: routes/admin/brands.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
const API_BASE_URL = 'http://localhost:3000';
const requireAdminLogin = require('../../middleware/requireAdminLogin');

// GET /admin/brands
router.get('/', requireAdminLogin, async (req, res) => {
  try {
    const { data: brands } = await axios.get(`${API_BASE_URL}/brands`, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.render('admin/brands', { brands });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Could not fetch brands', error });
  }
});

// GET /admin/brands/new
router.get('/new', requireAdminLogin, (req, res) => {
  res.render('admin/brandForm', { brand: null });
});

// POST /admin/brands
router.post('/', requireAdminLogin, async (req, res) => {
  try {
    await axios.post(`${API_BASE_URL}/brands`, req.body, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.redirect('/admin/brands');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Could not create brand', error });
  }
});

// GET /admin/brands/:id/edit
router.get('/:id/edit', requireAdminLogin, async (req, res) => {
  try {
    const { data: brands } = await axios.get(`${API_BASE_URL}/brands`, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    const brand = brands.find(b => b.id === parseInt(req.params.id, 10));
    if (!brand) {
      return res.status(404).render('error', { message: 'Brand not found' });
    }
    res.render('admin/brandForm', { brand });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Could not load brand', error });
  }
});

// PUT /admin/brands/:id
router.put('/:id', requireAdminLogin, async (req, res) => {
  try {
    await axios.put(`${API_BASE_URL}/brands/${req.params.id}`, req.body, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.redirect('/admin/brands');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Could not update brand', error });
  }
});

// DELETE /admin/brands/:id
router.delete('/:id', requireAdminLogin, async (req, res) => {
  try {
    await axios.delete(`${API_BASE_URL}/brands/${req.params.id}`, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.redirect('/admin/brands');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Could not delete brand', error });
  }
});

module.exports = router;


