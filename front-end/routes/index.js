const express = require('express');
const router = express.Router();

/**
 * Redirect root path depending on session status:
 * - If admin is logged in, redirect to admin dashboard
 * - Otherwise, redirect to login page
 */
router.get('/', (req, res) => {
  const user = req.session?.user;
  
  if (user && user.roleId === 1) {
    res.redirect('/admin');
  } else {
    res.redirect('/admin/login');
  }
});

module.exports = router;

