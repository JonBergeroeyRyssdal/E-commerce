// File: routes/admin/orders.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
const API_BASE_URL = 'http://localhost:3000';
const requireAdminLogin = require('../../middleware/requireAdminLogin');

// GET /admin/orders
router.get('/', requireAdminLogin, async (req, res) => {
  try {
    const { data: orders } = await axios.get(`${API_BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.render('admin/orders', { orders });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Could not fetch orders', error });
  }
});

// GET /admin/orders/:id
router.get('/:id', requireAdminLogin, async (req, res) => {
  try {
    const { data: order } = await axios.get(`${API_BASE_URL}/orders/${req.params.id}`, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.render('admin/orderDetails', { order });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Could not fetch order details', error });
  }
});

module.exports = router;

