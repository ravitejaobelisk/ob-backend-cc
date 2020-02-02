const postService = require('../services/PostService');
const userService = require('../services/UserService');
const logger = require('../config/logger');

/**
 * Function to process the syncing of user and post data from the JSON service
 *
 */
const init = async () => {
  try {
    logger.info('Start: Flushing old data');
    // flush all data
    await postService.flushPosts();
    await userService.flushUsers();
    logger.info('End: Flushing old data');

    logger.info('Start: Syncing users data from service');
    // update users
    await userService.populateUsers();
    logger.info('End: Syncing users data from service');

    logger.info('Start: Syncing posts data from service');
    // Insert data to posts
    await postService.populatePosts();
    logger.info('End: Syncing posts data from service');

    return { success: true };
  } catch (err) {
    logger.error('Syncing DB Error :: ', err);

    return { success: false };
  }
};

init();
