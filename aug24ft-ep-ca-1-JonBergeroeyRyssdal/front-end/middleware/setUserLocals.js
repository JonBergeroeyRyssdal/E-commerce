// Attach user info (username, role) to res.locals for all views
function setUserLocals(req, res, next) {
  const user = req.session?.user;
  res.locals.username = user?.username || '';
  res.locals.roleId   = user?.roleId   || null;
  next();
}


module.exports = {
  setUserLocals
};
