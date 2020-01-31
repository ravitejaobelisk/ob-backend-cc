const config = require(`../config/app/${process.env.NODE_ENV}`);
const log = require('../config/logger');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  });

  Post.associate = models => {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id'
    });
  };

  return Post;
};
