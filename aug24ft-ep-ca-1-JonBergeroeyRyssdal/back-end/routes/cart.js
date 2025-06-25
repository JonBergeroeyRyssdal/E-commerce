// routes/cart.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');

/**
 * @swagger
 * tags:
 *   - Cart
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get cart items for the authenticated user
 *     tags:
 *       - Cart
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticateToken, cartController.getCartItems);

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add a product to the authenticated user's cart
 *     tags:
 *       - Cart
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticateToken, cartController.addToCart);

/**
 * @swagger
 * /cart/checkout/now:
 *   post:
 *     summary: Checkout the cart immediately
 *     tags:
 *       - Cart
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 */
router.post('/checkout/now', authenticateToken, cartController.checkoutNow);

module.exports = router;


