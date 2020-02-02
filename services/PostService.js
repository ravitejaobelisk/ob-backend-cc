const request = require('request');

const config = require('../config/app/local');
const logger = require('../config/logger');
const { Post } = require('../models/index');

/**
 * Get all the posts from DB with pagination support
 * @param {*} pagination
 */
const getPostsFromDB = async pagination => {
  return Post.getPosts(pagination);
};

/**
 * Get Posts by Id - Wiring
 * @param {*} postId
 */
const getPostById = async postId => {
  return Post.getPostById(postId);
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

/**
 * Populates / syncs database with posts from service
 */
const populatePosts = async () => {
  // get users
  const posts = await getPosts();
  // populate users
  await Post.insertBulkPosts(posts);
};

/**
 * Proxy to delete query
 * Deletes all the posts from db
 */
const flushPosts = () => {
  return Post.flushPosts();
};

module.exports = {
  populatePosts,
  getPosts,
  getPostsFromDB,
  getPostById,
  flushPosts
};
