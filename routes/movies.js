const express = require('express');
const isUrl = require('validator/lib/isURL');

const movieRouter = express.Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { ErrorBadReq } = require('../errors/errorBadReq');

const urlValidator = (value) => {
  if (!isUrl(value)) {
    throw new ErrorBadReq('Ошибка валидации url адреса');
  }
  return value;
};

movieRouter.get('/movies', getMovie);

movieRouter.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    image: Joi.string().required().custom(urlValidator),
    trailerLink: Joi.string().required().custom(urlValidator),
    thumbnail: Joi.string().required().custom(urlValidator),
    movieId: Joi.number().required(),
  }),
}), createMovie);

movieRouter.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), deleteMovie);

module.exports = movieRouter;
