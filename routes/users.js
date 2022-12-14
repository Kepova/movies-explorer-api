const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser,
  updateUser,
} = require('../controllers/users');

userRouter.get('/me', getUser); // возвращает данные пользователя
userRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email(),
    }),
  }),
  updateUser,
); // обновляет данные пользователя

module.exports = userRouter;
