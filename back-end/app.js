// File: app.js
require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

// --- Routers ---
const initRouter = require('./routes/init');
const indexRouter = require('./routes/index');
const brandsRouter = require('./routes/brands');
const categoriesRouter = require('./routes/categories');
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');
const membershipsRouter = require('./routes/memberships');
const usersRouter = require('./routes/users');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/orders');
const searchRouter = require('./routes/search');
const rolesRouter = require('./routes/roles');

const app = express();

// --- Core middleware ---
app.use(logger('dev'));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// --- Swagger docs ---
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// --- Simple health check (nyttig for å se at serveren lever) ---
app.get('/health', (req, res) => {
  res.json({ ok: true, status: 'up' });
});

// --- DB (initialiserer Sequelize / authenticate osv.) ---
require('./models');

// --- Routes ---
app.use('/', indexRouter);
app.use('/init', initRouter);
app.use('/brands', brandsRouter);
app.use('/categories', categoriesRouter);
app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/memberships', membershipsRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);
app.use('/search', searchRouter);
app.use('/roles', rolesRouter);

// --- Favicon (unngå støy i loggen) ---
app.get('/favicon.ico', (req, res) => res.status(204).end());

// --- 404 ---
app.use((req, res) => {
  res.status(404).json({ error: true, message: 'Not Found' });
});

// --- Error handler ---
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;