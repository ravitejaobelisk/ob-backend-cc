const express = require('express');

const router = express.Router();
const apiController = require('../controllers/APIController');

/**
 * @swagger
 *
 * /post/list:
 *   get:
 *     tags:
 *      - Posts
 *     description: Get all posts with pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */
router.get('/post/list', apiController.postsList);
/**
 * @swagger
 *
 * /post/{id}:
 *   get:
 *     tags:
 *      - Posts
 *     description: Get Post Details by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required:
 *           - id
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */
router.get('/post/:id', apiController.getPostById);

module.exports = router;
