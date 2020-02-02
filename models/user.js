/**
 * User Model
 * Holds information about users
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING
    },
    address: {
      allowNull: true,
      type: DataTypes.JSONB
    },
    company: {
      allowNull: true,
      type: DataTypes.JSONB
    }
  });

  /**
   * Creates a association between user and posts model
   */
  User.associate = models => {
    // associations can be defined here
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      sourceKey: 'id'
    });
  };

  /**
   * Insert bulk users into the database
   */
  User.insertBulkUsers = users => {
    return User.bulkCreate(users, {});
  };

  /**
   * Delete all users from the database
   */
  User.flushUsers = () => {
    return User.destroy({ where: {}, force: true });
  };

  return User;
};
