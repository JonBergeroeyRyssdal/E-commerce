// routes/index.js
var express = require('express');
var router = express.Router();

/**
 * @swagger
 * tags:
 *   - Home
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Render home page
 *     tags:
 *       - Home
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

