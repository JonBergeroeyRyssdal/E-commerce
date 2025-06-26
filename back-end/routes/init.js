// routes/init.js
const express = require('express');
const router = express.Router();
const { initializeDatabase } = require('../services/initService');

/**
 * @swagger
 * tags:
 *   - Init
 */

/**
 * @swagger
 * /init:
 *   post:
 *     summary: Initialize the database
 *     tags:
 *       - Init
 *     responses:
 *       200:
 *         description: Database initialized successfully
 *       500:
 *         description: Initialization failed
 */
router.post('/', async (req, res) => {
  try {
    await initializeDatabase();
    res.status(200).json({ message: 'Database initialized successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Initialization failed', details: error.message });
  }
});

module.exports = router;





