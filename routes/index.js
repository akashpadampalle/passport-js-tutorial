const express = require('express');
const passport = require('passport');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const userController = require('../controllers/user_controllers');

router.get('/', homeController.home);
router.get('/login', homeController.login);
router.get('/signup', homeController.signup);
router.get('/restricted', passport.checkAuthentication ,homeController.restricted);

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/'
}));
router.post('/signup', userController.signup);


module.exports = router;