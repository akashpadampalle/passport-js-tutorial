const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email: email });

            if (!user || password != user.password) {
                return done(null, false);
            }


            return done(null, user);

        } catch (error) {
            console.log(error);
            return done(error);
        }
    }));


passport.serializeUser(function (user, done) {
    return done(null, user.id);
});

passport.deserializeUser(async function (uid, done) {
    const user = await User.findById(uid);
    user.password = undefined;
    done(null, user);
});


passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');

}


passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user
    }

    next();
}

module.exports = passport;