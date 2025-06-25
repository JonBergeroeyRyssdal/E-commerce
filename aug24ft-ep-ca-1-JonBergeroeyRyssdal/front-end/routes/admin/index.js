// File: routes/admin/index.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
const API_BASE_URL = 'http://localhost:3000';
const requireAdminLogin = require('../../middleware/requireAdminLogin');

// GET /admin (Dashboard)
router.get('/', requireAdminLogin, (req, res) => {
  res.render('admin/admin', {
    title: 'Admin Dashboard',
    user: req.session.user
  });
});

// GET /admin/login
router.get('/login', (req, res) => {
  res.render('admin/login', {
    title: 'Admin Login',
    error: null
  });
});

// POST /admin/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    const { token, user } = response.data;

    req.session.token = token;
    req.session.user = {
      username: user.username,
      roleId: user.roleId
    };

    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(401).render('admin/login', {
      title: 'Admin Login',
      error: 'Invalid email or password'
    });
  }
});

// GET /admin/logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
    }
    res.redirect('/admin/login');
  });
});

module.exports = router;

