const request = require('request');
const config = require('../config/app/local');
const logger = require('../config/logger');
const postModel = require('../models/index').Post;

const getPostsFromDB = async pagination => {
  const { limit } = pagination;
  const offset = pagination.page * limit - limit;
  return postModel.getPosts(limit, offset);
};

const getPostById = async postId => {
  return postModel.getPostById(postId);
};
/**
 * @function getPosts
 *
 * function to get posts
 */
const getPosts = () => {
  const postServicePath = `${config.baseUrl.postService}/posts`;

  return new Promise((resolve, reject) => {
    request.get(
      {
        url: postServicePath,
        method: 'GET',
        json: true
      },
      (error, response) => {
        if (error) {
          return reject(error);
        }
        if (response && response.statusCode !== 200) {
          logger.error(
            ` Error in generating Induction Id : ${JSON.stringify(
              response.body
            )}`
          );
          return reject(response.body);
        }
        return resolve(response.body);
      }
    );
  });
};

module.exports = {
  getPosts,
  getPostsFromDB,
  getPostById
};
