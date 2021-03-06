const logger = require('../config/logger');
const postService = require('../services/PostService');
const AppConstants = require('../constants/AppConstants');

/**
 * Renders all the posts from system
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getPosts = async (req, res, next) => {
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

    return res.render('postList', { posts });
  } catch (error) {
    logger.error('PostController#getPosts :: Error :: ', error);
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
    return res.render('postDetail', { post });
  } catch (error) {
    logger.error('PostController#getPostById :: Error :: ', error);
    next(error);
  }
};

module.exports = {
  getPosts,
  getPostById
};
