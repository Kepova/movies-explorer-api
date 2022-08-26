const movieRouter = require('express').Router();
const { isObjectIdOrHexString } = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { regexUrl } = require('../constants/constantRegExp');

const validationId = (value) => {
  if (isObjectIdOrHexString(value)) {
    return value;
  }
  throw new Error('Передан некорректный id фильма');
};

// возвращает все сохранённые текущим пользователем фильмы
movieRouter.get('/', getMovies);

// создаёт фильм
movieRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(new RegExp(regexUrl)),
      trailerLink: Joi.string().required().pattern(new RegExp(regexUrl)),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().required().pattern(new RegExp(regexUrl)),
      movieId: Joi.number().required(), // id из ответа стороннего api
      owner: Joi.required().custom(validationId),
    }),
  }),
  createMovie,
);

// удаляет сохранённый фильм по id
movieRouter.delete(
  '/:movieDeleteId',
  celebrate({
    params: Joi.object().keys({
      movieDeleteId: Joi.string().required().custom(validationId),
    }),
  }),
  deleteMovie,
);

module.exports = movieRouter;
