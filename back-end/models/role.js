// models/role.js
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt
      tableName: 'Roles',
    }
  );

  // Optional: define associations
  Role.associate = (models) => {
    Role.hasMany(models.User, {
      foreignKey: 'RoleId',
    });
  };

  return Role;
};
