const express = require('express');
const isUrl = require('validator/lib/isURL');

const movieRouter = express.Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

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
    image: Joi.string().required().custom((url, helpers) => {
      if (isUrl(url)) {
        return url;
      }
      return helpers.message('Некорректный url адресс');
    }),
    trailerLink: Joi.string().required().custom((url, helpers) => {
      if (isUrl(url)) {
        return url;
      }
      return helpers.message('Некорректный url адресс');
    }),
    thumbnail: Joi.string().required().custom((url, helpers) => {
      if (isUrl(url)) {
        return url;
      }
      return helpers.message('Некорректный url адресс');
    }),
    movieId: Joi.number().required(),
  }),
}), createMovie);

movieRouter.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), deleteMovie);

module.exports = movieRouter;
