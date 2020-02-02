const request = require('request');
const config = require('../config/app/local');
const logger = require('../config/logger');
const { User } = require('../models/index');

/**
 * Loads all the users from the service
 *
 */
const getUsersFromService = () => {
  // get users from the api
  const userService = `${config.baseUrl.postService}/users`;

  return new Promise((resolve, reject) => {
    request.get(
      {
        url: userService,
        method: 'GET',
        json: true
      },
      (error, response) => {
        if (error) {
          return reject(error);
        }

        if (response && response.statusCode !== 200) {
          logger.error(
            ` Error getting response from service : ${JSON.stringify(
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
 * Performs sync between databases.
 */
const populateUsers = async () => {
  // get users
  const users = await getUsersFromService();
  // populate users
  await User.insertBulkUsers(users);
};

/**
 * Proxy for delete users
 * Deletes all users from the DB.
 */
const flushUsers = () => {
  return User.flushUsers();
};

module.exports = {
  populateUsers,
  flushUsers
};
