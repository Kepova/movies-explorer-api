const autorizationRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login, outLogin } = require('../controllers/users');

autorizationRouter.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

autorizationRouter.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

autorizationRouter.get(
  '/signout',
  outLogin,
);

module.exports = autorizationRouter;
