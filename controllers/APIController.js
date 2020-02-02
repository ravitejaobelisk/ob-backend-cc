const logger = require('../config/logger');
const postService = require('../services/PostService');
const AppConstants = require('../constants/AppConstants');

/**
 * Returns Post list as JSON
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const postsList = async (req, res, next) => {
  try {
    let pagination;
    // set pagination
    if (req.query.page) {
      pagination = {
        page: req.query.page,
        limit:
          req.query.limit ||
          AppConstants.CONSTANTS.CONNECTION_DEFAULT_PAGINATION.LIMIT
      };
    }

    const posts = await postService.getPostsFromDB(pagination);

    return res.send({
      status: 'success',
      data: posts
    });
  } catch (error) {
    logger.error('APIController#getPosts :: Error :: ', error);
    next(error);
  }
};

/**
 * Renders one post by its id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostById(id);

    return res.send({
      status: 'success',
      data: post
    });
  } catch (error) {
    logger.error('APIController#getPostById :: Error :: ', error);
    next(error);
  }
};

module.exports = {
  postsList,
  getPostById
};
