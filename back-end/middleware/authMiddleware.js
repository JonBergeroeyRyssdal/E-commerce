const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'fallbacksecret';

// Middleware: verify JWT and extract user
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Access token missing' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    req.user = user;
    next();
  });
};

// Middleware: allow only admin (from token or session)
exports.adminOnly = (req, res, next) => {
  const tokenRoleId = req.user?.roleId;
  const sessionRoleId = req.session?.user?.roleId;

  if (tokenRoleId === 1 || sessionRoleId === 1) {
    next();
  } else {
    return res.status(403).json({ error: 'Admin access only' });
  }
};



