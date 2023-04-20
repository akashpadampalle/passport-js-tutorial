// getting required packages such as passport and local Strategy
const passport = require('passport');  
const LocalStrategy = require('passport-local').Strategy;

// we will need user module to check user email and password
const User = require('../models/user');

/**
 * this will be our local strategy
 * passport.use take one argument Strategy to use
 * local strategy takes two arguments one will be object containing usernameField (to check user by this name), passwordField (to check password of user) from request body
 * function of local strategy takes 3 arguments 1 - alise for username, 2 - alise for passowrd, 3 - callback function to return err or user according to situation
 */

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {

            /**
             * in this try block we find user by email id
             * if we got user but password is not matching then we return by calling callback function done
             * done function take argument 1 - error, 2 - false or user [false in the sense user authentication is not happened]
             */
            const user = await User.findOne({ email: email });
            if (!user || password != user.password) { return done(null, false); }
            return done(null, user);

        } catch (error) {
            // if any error accure during the try block we log and return done with error 
            console.log(error);
            return done(error);
        }
    }));

/**
 * serializeUser function is used to store information into session
 * from above function controller passed to serializeuser with user details
 * we will store its id in session cookie
 */
passport.serializeUser(function (user, done) {
    return done(null, user.id);
});

/**
 * deserializeUser is used to extract information from session cookie
 * we had stored a userid into session cookie using serializeUser method
 * we extract this id and find the user into database and passed on into callback (done)
 * this will later added into request as req.user
 */
passport.deserializeUser(async function (uid, done) {
    const user = await User.findById(uid);
    user.password = undefined;
    done(null, user);
});

// we made this custom middleware to restrict user from accessing without authentication
passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}

// we made this custom middleware to send user details to locals futher used into ejs
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) { res.locals.user = req.user }
    next();
}

// exporting all of configuration using Local Strategy for further use in project
module.exports = passport;