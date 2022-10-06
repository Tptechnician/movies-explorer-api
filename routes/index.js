const express = require('express');

const router = express.Router();
const { celebrate, Joi } = require('celebrate');

const { auth } = require('../middlewares/auth');
const { createUser, login, loginout } = require('../controllers/users');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  createUser,
);

router.post('/signout', loginout);

router.use(auth);

router.use(require('./movies'));

router.use(require('./users'));

router.use('*', require('./notFountPath'));

module.exports = router;
