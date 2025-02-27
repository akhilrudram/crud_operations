const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/userModel');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await UserModel.create({ email, password });

                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await UserModel.findOne({ email });

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(new JWTstrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
}, async (jwtPayload, done) => {

    try {
        const user = await UserModel.findById(jwtPayload.user._id);
        if (user) {

            return done(null, user);
        } else {

            return done(null, false);
        }
    } catch (error) {
        console.error('JWT Strategy Error:', error);
        return done(error, false);
    }
}));

