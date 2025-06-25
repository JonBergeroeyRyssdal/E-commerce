module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define(
    'Brand',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true, // createdAt + updatedAt
      tableName: 'Brands', // valgfritt, for klarhet
    }
  );

  return Brand;
};

