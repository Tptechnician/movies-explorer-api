const express = require('express');

const router = express.Router();

const { auth } = require('../middlewares/auth');
const { createUser, login, loginout } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../middlewares/reqValidation');

router.post('/signin', validateLogin, login);

router.post('/signup', validateCreateUser, createUser);

router.post('/signout', loginout);

router.use(auth);

router.use(require('./movies'));

router.use(require('./users'));

router.use('*', require('./notFountPath'));

module.exports = router;
