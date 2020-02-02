/**
 * Post Model
 * Holds information about posts and relation to the user
 */
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

  /**
   * Bulk inserts posts
   * @param posts
   */
  Post.insertBulkPosts = posts => {
    return Post.bulkCreate(posts, {
      returning: true
    });
  };

  /**
   * Get Posts Query to the database
   * @param {*} pagination
   */
  Post.getPosts = pagination => {
    const queryOptions = {
      include: ['user'],
      raw: true,
      nest: true
    };

    // get the pagination values
    if (pagination) {
      queryOptions.limit = pagination.limit;
      queryOptions.offset =
        pagination.page * pagination.limit - pagination.limit;
    }

    return Post.findAll(queryOptions);
  };

  /**
   * Get Post by id query
   * @param postId
   */
  Post.getPostById = postId => {
    return Post.findOne({
      where: {
        id: postId
      },
      raw: true,
      nest: true,
      include: [{ all: true }]
    });
  };

  /**
   * Associates user model to the Post model
   */
  Post.associate = models => {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'user'
    });
  };

  /**
   * Removes all posts from the db
   */
  Post.flushPosts = () => {
    return Post.destroy({
      where: {},
      force: true
    });
  };

  return Post;
};
