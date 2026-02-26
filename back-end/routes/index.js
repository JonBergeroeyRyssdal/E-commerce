// routes/index.js
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - Home
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: API root endpoint
 *     tags:
 *       - Home
 *     responses:
 *       200:
 *         description: API is running
 */
router.get('/', (req, res) => {
  res.json({
    message: 'E-commerce API is running',
    documentation: '/doc',
    health: '/health'
  });
});

module.exports = router;

