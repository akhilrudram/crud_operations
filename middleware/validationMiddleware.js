const { body } = require('express-validator');

exports.validatePost = [
    body('title').notEmpty().withMessage('Title is required'),
    body('body').notEmpty().withMessage('Body is required'),
    body('location.latitude').isFloat().withMessage('Invalid latitude'),
    body('location.longitude').isFloat().withMessage('Invalid longitude'),
    (req, res, next) => {
        const errors = body(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
