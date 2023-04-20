// getitng express to use Router() method this will help to setup routes
const express = require('express');
const router = express.Router();

// passport is used to authentication and authorization user
const passport = require('passport');

// getting controller to use their actions according to routes
const homeController = require('../controllers/home_controller');
const userController = require('../controllers/user_controllers');


router.get('/', homeController.home); // render homepage
router.get('/login', homeController.login); // render login page
router.get('/signup', homeController.signup); // render signup page
router.get('/signout', passport.checkAuthentication ,userController.destroySession); // if authentication is passed it used to delete session (logout)
router.get('/restricted', passport.checkAuthentication ,homeController.restricted); // if authentication is passed it renders restricted page

/** 
 * on /login (post) route we have use passport to authenticating user using local strategy
 * passport.authenticate take two argument 1 - strategy to use , 2 - object of option wich contains redirection paths
 * if authentication is failed then user is redirected to /login
 * if authentication is successfull then user is redirected to home page
*/ 
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' }));
router.post('/signup', userController.signup); // create user
module.exports = router; // export routes 
