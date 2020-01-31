const config = require(`../config/app/${process.env.NODE_ENV}`);
const log = require('../config/logger');
const model = require('../models/index');
const User = require('./user');
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      foreignKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    body: {
      allowNull: true,
      type: DataTypes.TEXT
    }
  });

  Post.insertBulkPosts = posts => {
    return Post.bulkCreate(posts, { returning: true });
  };

  Post.getPosts = (limit, offset) => {
    return Post.findAll({
      limit,
      offset,
      raw: true,
      include: ['User']
    });
  };

  Post.getPostById = postId => {
    return Post.findOne({
      where: {
        id: postId
      },
      raw: true
    });
  };

  Post.associate = models => {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'User'
    });
  };

  return Post;
};
