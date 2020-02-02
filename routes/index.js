const express = require('express');

const router = express.Router();
const postController = require('../controllers/PostController');

/* GET users listing. */
router.get('/', postController.getPosts);
router.get('/post/:id', postController.getPostById);

module.exports = router;
