// File: app.js

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
// Note: require('./routes/admin') will auto-load index.js
const adminIndexRouter = require('./routes/admin/index');  // explicitly load index.js
const adminUsersRouter    = require('./routes/admin/users');
const adminProductsRouter = require('./routes/admin/products');
const adminSearchRouter   = require('./routes/admin/search');
const adminOrdersRouter   = require('./routes/admin/orders');
const adminBrandsRouter   = require('./routes/admin/brands');
const adminCategoriesRouter = require('./routes/admin/categories');

const app = express();

// ---- View Engine & Layouts ----
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');  // points to views/layouts/layout.ejs

// ---- Core Middleware ----
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(
  session({
    secret: 'dittHemmeligeSessionSecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);

// Attach user info for templates
app.use(setUserLocals);

// ---- Static Assets ----
app.use(express.static(path.join(__dirname, 'public')));

// ---- Public Routes ----
app.use('/', indexRouter);

// ---- Admin Routes ----
// Public: login/logout/dashboard
app.use('/admin', adminIndexRouter);
// Protected sub-routes
app.use('/admin/users', requireAdminLogin, adminUsersRouter);
app.use('/admin/products', requireAdminLogin, adminProductsRouter);
app.use('/admin/products/search', requireAdminLogin, adminSearchRouter);
app.use('/admin/orders', requireAdminLogin, adminOrdersRouter);
app.use('/admin/brands', requireAdminLogin, adminBrandsRouter);
app.use('/admin/categories', requireAdminLogin, adminCategoriesRouter);

// ---- Error Handling ----
// 404
app.use((req, res, next) => next(createError(404)));
// General error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;






