// models/category.js
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt columns
      tableName: 'Categories', // Optional: explicitly define table name
    }
  );

  return Category;
};

