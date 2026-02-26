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
      timestamps: true,
      tableName: 'Orders',
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Order.hasMany(models.OrderItem, {
      foreignKey: 'orderId',
      onDelete: 'CASCADE',
    });
  };

  return Order;
};

