const Handlebars = require('handlebars');
const postService = require('../services/PostService');
const AppConstants = require('../constants/AppConstants');
const PostConstants = require('../constants/PostsConstants');

const getPosts = async (req, res, next) => {
  try {
    const pagination = {
      page:
        +req.query.page ||
        AppConstants.CONSTANTS.CONNECTION_DEFAULT_PAGINATION.PAGE,
      limit:
        +req.query.limit ||
        AppConstants.CONSTANTS.CONNECTION_DEFAULT_PAGINATION.LIMIT
    };
    const posts = await postService.getPostsFromDB(pagination);

    // eslint-disable-next-line no-use-before-define
    const result = await renderContent(
      { posts },
      PostConstants.POSTS_TABLE_HTML
    );
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await postService.getPostById(postId);

    // eslint-disable-next-line no-use-before-define
    const result = await renderContent(post, PostConstants.POSTS_DETAILS);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

const renderContent = async (posts, source) => {
  const template = Handlebars.compile(source);

  const result = template(posts);

  return result;
};

module.exports = {
  getPosts,
  getPostById
};
