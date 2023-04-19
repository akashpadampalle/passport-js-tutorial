const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},async (email, password, done) => {
    try {
    const user = await User.findOne({email: email});

    if(!user){
        return done(null, false);
    }

    if(password != user.password){
        return done(null, false);
    }

    return done(null, user);

    } catch (error) {
        console.log(error);
        return done(error);
    }
}));


passport.serializeUser(function (user, done){
    return done(null, user.id);
});

passport.deserializeUser(async function(id, done){
    const user = User.findById(id);
    done(null, user);
});


module.exports = passport;