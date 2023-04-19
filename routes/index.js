const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const userController = require('../controllers/user_controllers');

router.get('/', homeController.home);
router.get('/login', homeController.login);
router.get('/signup', homeController.signup);


router.post('/login', userController.login);
router.post('/signup', userController.signup)

module.exports = router;