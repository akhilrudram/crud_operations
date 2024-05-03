const express = require('express');
const router = express.Router();
const passport = require('passport');
const postController = require('../controller/postsController');
const { validatePost } = require('../middleware/validationMiddleware');

router.use(passport.authenticate('jwt', { session: false }));

// CRUD endpoints for posts
router.post('/posts', validatePost, postController.createPost);
router.get('/posts', postController.getPosts);
router.put('/posts', validatePost, postController.updatePost);
router.delete('/posts', postController.deletePost);

//Retrieve posts using latitude and longitude
router.get('/location', postController.getPostsByLocation);
// Get Posts Count
router.get('/postCount', postController.getPostCount);

module.exports = router;
