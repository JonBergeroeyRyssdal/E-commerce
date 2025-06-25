// routes/orders.js
const express = require('express');
const router = express.Router();
const { authenticateToken, adminOnly } = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

// Authenticate all order routes
router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   - Orders
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders (admin only)
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 */
router.get('/', adminOnly, orderController.getAllOrders);

/**
 * @swagger
 * /orders/{id}/status:
 *   put:
 *     summary: Update order status (admin only)
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the order
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 */
router.put('/:id/status', adminOnly, orderController.updateOrderStatus);

/**
 * @swagger
 * /orders/my:
 *   get:
 *     summary: Get orders for authenticated user
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 */
router.get('/my', orderController.getUserOrders);

/**
 * @swagger
 * /orders/cart/checkout/now:
 *   post:
 *     summary: Checkout the cart immediately for authenticated user
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 */
router.post('/cart/checkout/now', orderController.checkoutCartNow);

module.exports = router;


