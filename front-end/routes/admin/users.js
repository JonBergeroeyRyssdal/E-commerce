// File: routes/admin/users.js

const express = require('express');
const router = express.Router();
const api = require('../../services/api'); // ✅ felles axios client
const requireAdminLogin = require('../../middleware/requireAdminLogin');

// GET /admin/users
router.get('/', requireAdminLogin, async (req, res) => {
  try {
    const { data: users } = await api.get('/users', {
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
    await api.put(
      `/users/${req.params.id}/role`,
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
    await api.put(
      `/users/${req.params.id}/role`,
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
    // hvis register-endpoint krever admin-token, legg til header:
    await api.post('/auth/register', req.body, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });

    res.redirect('/admin/users');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Could not create user', error });
  }
});

module.exports = router;