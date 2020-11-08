const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/user');

const router = express.Router();

router.get('/', usersController.getUser);

router.post('/login', usersController.login);

router.post(
    '/signup', 
    [
        check('name')
        .not()
        .isEmpty()
        .isLength({min:2}),
        check('mobile')
        .not()
        .isEmpty(),
        check('email')
        .not()
        .isEmpty()
        .isEmail()
        
    ] , 
    usersController.signUp);


module.exports = router;
