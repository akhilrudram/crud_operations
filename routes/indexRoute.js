const express = require('express');
const router = express.Router();

// User Authentication
router.use('/', require('./userRoute'));

// // User CRUD
router.use('/', require('./postsRoute'));

module.exports = router;
