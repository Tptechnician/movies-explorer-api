const express = require('express');
const ReqNotFound = require('../errors/reqNotFound');

const notFountPath = express.Router();

notFountPath.all('*', () => {
  throw new ReqNotFound('Запрашиваемого ресурса не существует');
});

module.exports = notFountPath;
