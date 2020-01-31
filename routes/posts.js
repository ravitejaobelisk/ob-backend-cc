const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');

/* GET users listing. */
router.get('/', postController.getPosts);

// Get posts by post Id
router.get('/:postId', postController.getPostById);

module.exports = router;
