const express = require('express');
const { celebrate, Joi } = require('celebrate');

const usersRouter = express.Router();

const {
  updateUser,
  getUser,
} = require('../controllers/users');

usersRouter.get('/users/me', getUser);

usersRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);

module.exports = usersRouter;
