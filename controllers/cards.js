const jwt = require('jsonwebtoken');
const Card = require('../models/card');
const ErrorBadReq = require('../errors/errorBadReq');
const ReqNotFound = require('../errors/reqNotFound');
const ErrorForbiddenAction = require('../errors/errorForbiddenAction');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const decoded = jwt.decode(req.cookies.jwt);
  const id = decoded._id;
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new ReqNotFound('Нет карточки с таким id');
      }
      if (card.owner.toString() !== id) {
        throw new ErrorForbiddenAction('Нет прав для удаления карточки');
      } else {
        Card.findByIdAndRemove(cardId)
          .then((deletedCard) => {
            res.status(200).send(deletedCard);
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports.createCards = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ErrorBadReq('Некорректные данные карточки');
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((updatedCard) => {
      if (!updatedCard) {
        throw new ReqNotFound('Карточки с таким id нет');
      }
      res.send(updatedCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadReq('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((updatedCard) => {
      if (!updatedCard) {
        res.status(404).send({ message: 'Карточки с таким id нет' });
        return;
      }
      res.send(updatedCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadReq('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};
