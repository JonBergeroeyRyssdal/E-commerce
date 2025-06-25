// File: app.js

// --- Imports ---
const createError    = require('http-errors');
const express        = require('express');
const path           = require('path');
const cookieParser   = require('cookie-parser');
const logger         = require('morgan');
const bodyParser     = require('body-parser');
const swaggerUi      = require('swagger-ui-express');
const swaggerFile    = require('./swagger-output.json');

// --- Routers ---
const initRouter        = require('./routes/init');
const indexRouter       = require('./routes/index');
// const usersRouter     = require('./routes/users'); // om du trenger den
const brandsRouter      = require('./routes/brands');
const categoriesRouter  = require('./routes/categories');
const authRouter        = require('./routes/auth');
const productsRouter    = require('./routes/products');
const membershipsRouter = require('./routes/memberships');
const usersRouter       = require('./routes/users');
const cartRouter        = require('./routes/cart');
const orderRouter       = require('./routes/orders');
const searchRouter      = require('./routes/search');
const rolesRouter       = require('./routes/roles');

// --- Express-instansiering ---
const app = express();

// --- Swagger-UI setup ---
app.use(bodyParser.json());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// --- Database-tilkobling ---
require('./models'); // kjører authenticate på Sequelize

// --- View engine (EJS) ---
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// --- Core middleware ---
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

// --- Håndter 404 ---
app.use((req, res, next) => {
  next(createError(404));
});

// --- Feilhåndtering ---
app.use((err, req, res, next) => {
  // Sett lokale variabler, bare vis detaljert feil i dev
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};
  
  // Respond med riktig kode og vis EJS-feilview
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

