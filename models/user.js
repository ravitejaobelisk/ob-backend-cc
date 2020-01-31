const config = require(`../config/app/${process.env.NODE_ENV}`);
const log = require('../config/logger');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  });

  User.associate = models => {
    // associations can be defined here
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      sourceKey: 'id'
    });
  };

  return User;
};
