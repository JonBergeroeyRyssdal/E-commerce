// File: routes/admin/users.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
const API_BASE_URL = 'http://localhost:3000';
const requireAdminLogin = require('../../middleware/requireAdminLogin');

// GET /admin/users
router.get('/', requireAdminLogin, async (req, res) => {
  try {
    const { data: users } = await axios.get(`${API_BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.render('admin/users', { users });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Could not fetch users', error });
  }
});

// POST /admin/users/:id/promote
router.post('/:id/promote', requireAdminLogin, async (req, res) => {
  try {
    await axios.put(
      `${API_BASE_URL}/users/${req.params.id}/role`,
      { roleId: 1 },
      { headers: { Authorization: `Bearer ${req.session.token}` } }
    );
    res.redirect('/admin/users');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Could not promote user', error });
  }
});

// POST /admin/users/:id/demote
router.post('/:id/demote', requireAdminLogin, async (req, res) => {
  try {
    await axios.put(
      `${API_BASE_URL}/users/${req.params.id}/role`,
      { roleId: 2 },
      { headers: { Authorization: `Bearer ${req.session.token}` } }
    );
    res.redirect('/admin/users');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Could not demote user', error });
  }
});

// GET /admin/users/new
router.get('/new', requireAdminLogin, (req, res) => {
  res.render('admin/userForm', { user: null });
});

// POST /admin/users
router.post('/', requireAdminLogin, async (req, res) => {
  try {
    await axios.post(`${API_BASE_URL}/auth/register`, req.body);
    res.redirect('/admin/users');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Could not create user', error });
  }
});

module.exports = router;


