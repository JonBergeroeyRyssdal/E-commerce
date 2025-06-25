// models/membership.js
module.exports = (sequelize, DataTypes) => {
  const Membership = sequelize.define(
    'Membership',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      min: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      max: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt
      tableName: 'Memberships', // Optional: explicitly define table name
    }
  );

  return Membership;
};

