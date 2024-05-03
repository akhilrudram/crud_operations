const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const passport = require('passport');

router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    userController.signup
);
router.post('/login', userController.login);


module.exports = router;