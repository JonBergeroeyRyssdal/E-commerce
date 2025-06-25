// routes/memberships.js
const express = require('express');
const router = express.Router();
const { authenticateToken, adminOnly } = require('../middleware/authMiddleware');
const membershipController = require('../controllers/membershipController');

/**
 * @swagger
 * tags:
 *   - Memberships
 */

/**
 * @swagger
 * /memberships:
 *   get:
 *     summary: Get all memberships for authenticated user
 *     tags:
 *       - Memberships
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticateToken, membershipController.getAllMemberships);

/**
 * @swagger
 * /memberships:
 *   post:
 *     summary: Create a new membership
 *     tags:
 *       - Memberships
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticateToken, adminOnly, membershipController.createMembership);

/**
 * @swagger
 * /memberships/{id}:
 *   put:
 *     summary: Update an existing membership
 *     tags:
 *       - Memberships
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the membership
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
router.put('/:id', authenticateToken, adminOnly, membershipController.updateMembership);

/**
 * @swagger
 * /memberships/{id}:
 *   delete:
 *     summary: Delete a membership
 *     tags:
 *       - Memberships
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the membership
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 */
router.delete('/:id', authenticateToken, adminOnly, membershipController.deleteMembership);

module.exports = router;
