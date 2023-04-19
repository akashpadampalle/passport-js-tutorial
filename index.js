const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./configs/db_connection');

//used for session cookie 
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('./configs/passport_local_strategy');

const port = 8000;


const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());


app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(session({
    name: "passportDemo",
    secret: "something",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*10)
    }
}));


app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'));

app.listen(port, (err) => {
    if(err){console.log(err);return;}
    console.log(`server is runnig at port ${port}`);
})