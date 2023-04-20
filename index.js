const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./configs/db_connection'); // getting mongodb connection 

//used for session cookie 
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('./configs/passport_local_strategy');
const MongoStore = require('connect-mongo'); // mongostore is use to store session data into mongodb

const port = 8000;

const app = express(); // creating server

// encoding, decoding 
app.use(express.json()); // encode and decode json object (json <-> stringfy)
app.use(express.urlencoded()); // parser use to decode body of request (post)
app.use(cookieParser()); // cookie parser to decode cookies 

// setting up view templet (ejs)
app.set('view engine', 'ejs');
app.set('views', 'views');

/**
 * using session (express-session) middleware to create and store session cookies
 * name - name of cookie
 * secret - encode cookie using this key
 * saveUninitialized - store extra data without authentication 
 * resave - resave everytime even if there is no changes into cookie
 * cookie - object use to modify cookie accordingly we set its maxAge (expiry) to 30 Days after creation
 * store - store cookie at server side we have use mongostore
 * mongoStroe.create (connect-mongo) use to make connection to mongob using mongoUrl, collectionname
 * autoRemove is used to delete cookie accept one of three 'disabled', 'native', 'interval'
 */
app.use(session({
    name: "passportDemo",
    secret: "something",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*60*24*30)
    },
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/passport-demo",
        collectionName: 'sessions',
        autoRemove: 'native'
    })
}));


app.use(passport.initialize()); // passport middleware for authentication
app.use(passport.session()); // session middlewared
app.use(passport.setAuthenticatedUser); // custom middleware to authorization (is user is logged in get user from req and stores into res.locals)
app.use('/', require('./routes/index')); // setup routes

// express server is listening requests at $port 
app.listen(port, (err) => {
    if(err){console.log(err);return;}
    console.log(`server is runnig at port ${port}`);
})