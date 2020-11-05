const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/user');

const router = express.Router();

router.get('/', usersController.getUser);

router.post('/login', usersController.login);

router.post('/signup',  usersController.signUp);


module.exports = router;
