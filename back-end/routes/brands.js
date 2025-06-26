// routes/brand.js
const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const { authenticateToken, adminOnly } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   - Brands
 */

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Retrieve all brands
 *     tags:
 *       - Brands
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal server error
 */
router.get('/', brandController.getAllBrands);

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Create a new brand
 *     tags:
 *       - Brands
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticateToken, adminOnly, brandController.createBrand);

/**
 * @swagger
 * /brands/{id}:
 *   put:
 *     summary: Update an existing brand
 *     tags:
 *       - Brands
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the brand
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 */
router.put('/:id', authenticateToken, adminOnly, brandController.updateBrand);

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Delete a brand
 *     tags:
 *       - Brands
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the brand
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 */
router.delete('/:id', authenticateToken, adminOnly, brandController.deleteBrand);

module.exports = router;


