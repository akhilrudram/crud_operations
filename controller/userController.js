// userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const passport = require('passport');

exports.signup = async (req, res) => {
    res.json({
        message: 'Signup successful',
        user: req.user,
    });
};

exports.login = async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                return res.status(401).json({ message: info.message });
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);

                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, process.env.SECRET);

                return res.json({ token });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
};