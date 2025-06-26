// models/product.js
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING, // Could later switch to TEXT if using base64
        allowNull: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt
      tableName: 'Products',
    }
  );

  // Define relationships
  Product.associate = (models) => {
    Product.belongsTo(models.Brand, {
      foreignKey: 'BrandId',
      onDelete: 'SET NULL',
    });

    Product.belongsTo(models.Category, {
      foreignKey: 'CategoryId',
      onDelete: 'SET NULL',
    });

    Product.hasMany(models.Cart, {
      foreignKey: 'productId',
    });

    Product.hasMany(models.OrderItem, {
      foreignKey: 'productId',
    });
  };

  return Product;
};

