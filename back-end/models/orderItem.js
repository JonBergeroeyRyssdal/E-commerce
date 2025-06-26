// models/orderItem.js
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    'OrderItem',
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      priceAtPurchase: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      timestamps: true, // Automatically adds createdAt and updatedAt
      tableName: 'OrderItems', // Optional: explicitly define table name
    }
  );

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      foreignKey: 'orderId',
      onDelete: 'CASCADE', // Delete order items if order is deleted
    });

    OrderItem.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE', // Delete order items if product is deleted
    });
  };

  return OrderItem;
};


