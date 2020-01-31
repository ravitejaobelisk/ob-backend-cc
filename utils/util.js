/* eslint-disable no-unused-vars */
const postService = require('../services/PostService');
const logger = require('../config/logger');
const postModel = require('../models/index').Post;

/**
 * @function getApiData
 *
 * function
 */
const getApiData = async () => {
  // get the required data
  const posts = await postService.getPosts();
  // Insert data to posts
  // eslint-disable-next-line no-restricted-syntax
  return postModel.insertBulkPosts(posts);
};

getApiData();

module.exports = {
  getApiData
};
