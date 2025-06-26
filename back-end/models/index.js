const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Test database connection (optional, remove in production)
sequelize.authenticate()
  .then(() => {})
  .catch(() => {});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Initialize models
db.Role = require('./role')(sequelize, DataTypes);
db.Membership = require('./membership')(sequelize, DataTypes);
db.User = require('./user')(sequelize, DataTypes);
db.Category = require('./category')(sequelize, DataTypes);
db.Brand = require('./brand')(sequelize, DataTypes);
db.Product = require('./product')(sequelize, DataTypes);
db.Cart = require('./cart')(sequelize, DataTypes);
db.Order = require('./order')(sequelize, DataTypes);
db.OrderItem = require('./orderItem')(sequelize, DataTypes);

// Define associations

// Role ↔ User
db.Role.hasMany(db.User);
db.User.belongsTo(db.Role);

// Membership ↔ User
db.Membership.hasMany(db.User);
db.User.belongsTo(db.Membership);

// Category ↔ Product
db.Category.hasMany(db.Product);
db.Product.belongsTo(db.Category);

// Brand ↔ Product
db.Brand.hasMany(db.Product);
db.Product.belongsTo(db.Brand);

// User ↔ Cart
db.User.hasMany(db.Cart, { foreignKey: 'userId' });
db.Cart.belongsTo(db.User, { foreignKey: 'userId' });

// Product ↔ Cart
db.Product.hasMany(db.Cart, { foreignKey: 'productId' });
db.Cart.belongsTo(db.Product, { foreignKey: 'productId' });

// User ↔ Order
db.User.hasMany(db.Order);
db.Order.belongsTo(db.User);

// Order ↔ OrderItem
db.Order.hasMany(db.OrderItem);
db.OrderItem.belongsTo(db.Order);

// Product ↔ OrderItem
db.Product.hasMany(db.OrderItem);
db.OrderItem.belongsTo(db.Product);

module.exports = db;



