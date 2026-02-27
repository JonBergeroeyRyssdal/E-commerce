// File: app.js
require('dotenv').config();

const createError    = require('http-errors');
const express        = require('express');
const expressLayouts = require('express-ejs-layouts');
const path           = require('path');
const cookieParser   = require('cookie-parser');
const logger         = require('morgan');
const session        = require('express-session');
const methodOverride = require('method-override');

// ---- Custom Middleware ----
const requireAdminLogin = require('./middleware/requireAdminLogin');
const { setUserLocals } = require('./middleware/setUserLocals');

// ---- Routers ----
// Public
const indexRouter = require('./routes/index');

// Admin
const adminIndexRouter      = require('./routes/admin/index');
const adminUsersRouter      = require('./routes/admin/users');
const adminProductsRouter   = require('./routes/admin/products');
const adminSearchRouter     = require('./routes/admin/search');
const adminOrdersRouter     = require('./routes/admin/orders');
const adminBrandsRouter     = require('./routes/admin/brands');
const adminCategoriesRouter = require('./routes/admin/categories');

const app = express();

// ✅ Render/Proxy-friendly (viktig når du bruker sessions/cookies bak Render)
app.set('trust proxy', 1);

// ✅ Backend base URL (settes i Render env vars på FRONTEND service)
// Lokalt kan du bruke http://localhost:XXXX
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
app.locals.API_BASE_URL = API_BASE_URL;

// ---- View Engine & Layouts ----
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/layout'); // views/layouts/layout.ejs

// ---- Core Middleware ----
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));

// ✅ Session secret må komme fra env (ikke hardkodet)
if (!process.env.SESSION_SECRET) {
  console.warn('⚠️ SESSION_SECRET is not set. Set it in Render Environment Variables.');
}

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-only-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,   // Sett til true hvis du vil tvinge HTTPS-cookies (kan aktiveres senere)
      sameSite: 'lax'
    }
  })
);

// Attach user info for templates
app.use(setUserLocals);

// ---- Static Assets ----
app.use(express.static(path.join(__dirname, 'public')));

// ---- Public Routes ----
app.use('/', indexRouter);

// ---- Admin Routes ----
app.use('/admin', adminIndexRouter);
app.use('/admin/users', requireAdminLogin, adminUsersRouter);
app.use('/admin/products', requireAdminLogin, adminProductsRouter);
app.use('/admin/products/search', requireAdminLogin, adminSearchRouter);
app.use('/admin/orders', requireAdminLogin, adminOrdersRouter);
app.use('/admin/brands', requireAdminLogin, adminBrandsRouter);
app.use('/admin/categories', requireAdminLogin, adminCategoriesRouter);

// ---- Error Handling ----
app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;





