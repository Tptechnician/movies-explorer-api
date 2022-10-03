const jwt = require('jsonwebtoken');
const Movie = require('../models/movie');
const ErrorBadReq = require('../errors/errorBadReq');
const ReqNotFound = require('../errors/reqNotFound');
const ErrorForbiddenAction = require('../errors/errorForbiddenAction');

module.exports.getMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const id = jwt.decode(req.cookies.jwt)._id;
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new ReqNotFound('Нет фильма с таким id');
      }
      if (movie.owner.toString() !== id) {
        throw new ErrorForbiddenAction('Нет прав для удаления фильма');
      } else {
        Movie.findByIdAndRemove(movieId)
          .then((deletedMovie) => {
            res.status(200).send(deletedMovie);
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ ...req.body, owner })
    .then((movie) => res.send(movie))
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        throw new ErrorBadReq('Некорректные данные фильма');
      }
    })
    .catch(next);
};
