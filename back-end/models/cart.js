// models/cart.js
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    'Cart',
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      timestamps: true, // Automatically adds createdAt and updatedAt fields
      tableName: 'Carts', // Optional: explicitly define table name
    }
  );

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE', // Delete cart items if user is deleted
    });

    Cart.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE', // Delete cart items if product is deleted
    });
  };

  return Cart;
};





