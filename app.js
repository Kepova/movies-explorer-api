require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-err');
const CentralizedError = require('./errors/centralized-error');
const router = require('./routes/index');
const auth = require('./middlewares/auth');
const { createUser, login, outLogin } = require('./controllers/users');
const { regexUrl } = require('./constants/constantRegExp');
const limiter = require('./middlewares/rateLimiter');

const { PORT = 3000, MONGO_DB = 'mongodb://localhost:27017/moviesdb_dev' } = process.env;
const app = express();

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);

app.use(limiter);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(new RegExp(regexUrl)),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);
app.get(
  '/signout',
  outLogin,
);

app.use(auth, router);

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());
app.use(CentralizedError);

app.listen(PORT);
