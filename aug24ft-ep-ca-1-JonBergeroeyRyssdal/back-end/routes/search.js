// routes/search.js
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

/**
 * @swagger
 * tags:
 *   - Search
 */

/**
 * @swagger
 * /search:
 *   post:
 *     summary: Search products by criteria
 *     tags:
 *       - Search
 *     requestBody:
 *       description: Search parameters (e.g., name, category, brand)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name to search for
 *               category:
 *                 type: string
 *                 description: Category to filter by
 *               brand:
 *                 type: string
 *                 description: Brand to filter by
 *             example:
 *               name: "shoe"
 *               category: "Footwear"
 *               brand: "Nike"
 *     responses:
 *       200:
 *         description: Search results returned
 *       400:
 *         description: Bad request (invalid search parameters)
 */
router.post('/', searchController.searchProducts);

module.exports = router;

