const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/notAuthError');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new NotAuthError('Необходима авторизация');
  }
  req.user = payload;
  next();
};
