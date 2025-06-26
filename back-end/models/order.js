// models/order.js
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'In Progress',
      },
      totalQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discountApplied: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      orderNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true, // Automatically adds createdAt and updatedAt
      tableName: 'Orders', // Optional: explicitly define table name
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE', // Optional: clean up orders if user is deleted
    });

    Order.hasMany(models.OrderItem, {
      foreignKey: 'orderId',
      onDelete: 'CASCADE', // Optional: delete order items if order is deleted
    });
  };

  return Order;
};

