// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // Foreign key to Role model
      RoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
        field: 'role_id',
      },

      // Foreign key to Membership model
      MembershipId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: 'membership_id',
      },
    },
    {
      timestamps: true,
      tableName: 'Users',
    }
  );

  User.associate = (models) => {
    User.belongsTo(models.Role, { foreignKey: 'RoleId' });
    User.belongsTo(models.Membership, { foreignKey: 'MembershipId' });
    User.hasMany(models.Order, { foreignKey: 'userId' });
    User.hasMany(models.Cart, { foreignKey: 'userId' });
  };

  return User;
};




