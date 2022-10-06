const express = require('express');

const movieRouter = express.Router();

const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/reqValidation');

const {
  getMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

movieRouter.get('/movies', getMovie);

movieRouter.post('/movies', validateCreateMovie, createMovie);

movieRouter.delete('/movies/:movieId', validateDeleteMovie, deleteMovie);

module.exports = movieRouter;
