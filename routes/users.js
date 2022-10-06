const express = require('express');

const usersRouter = express.Router();

const { validateUpdateUser } = require('../middlewares/reqValidation');

const {
  updateUser,
  getUser,
} = require('../controllers/users');

usersRouter.get('/users/me', getUser);

usersRouter.patch('/users/me', validateUpdateUser, updateUser);

module.exports = usersRouter;
