const express = require('express');

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
    image: Joi.string().required().regex(/^(https?:\/\/)?([\da-z.-]+)([a-z.]{2,6})([/\w.-]*)*\/?$/),
    trailerLink: Joi.string().required().regex(/^(https?:\/\/)?([\da-z.-]+)([a-z.]{2,6})([/\w.-]*)*\/?$/),
    thumbnail: Joi.string().required().regex(/^(https?:\/\/)?([\da-z.-]+)([a-z.]{2,6})([/\w.-]*)*\/?$/),
    movieId: Joi.number().required(),
  }),
}), createMovie);

movieRouter.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), deleteMovie);

module.exports = movieRouter;
