function requireAdminLogin(req, res, next) {
  const user = req.session?.user;

  if (user?.roleId === 1) {
    return next(); // User is admin – continue
  }

  // Not logged in or not admin – redirect to login
  return res.redirect('/admin/login');
}

module.exports = requireAdminLogin;

