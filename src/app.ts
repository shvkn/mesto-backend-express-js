import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { celebrate, errors, Joi } from 'celebrate';

import { createUser, login } from './controllers/users';
import userRoutes from './routes/users';
import cardRoutes from './routes/cards';
import errorMiddleware from './middlewares/error-middleware';
import authMiddleware from './middlewares/auth-middleware';
import NotFoundedError from './shared/errors/not-founded-error';
import { ErrorMessages } from './shared/constants';
import { errorLogger, requestLogger } from './middlewares/logger';
import validateUrl from './shared/validate-url';

dotenv.config();

const {
  EXPRESS_PORT = 3000,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
} = process.env;

const DB_URL = `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

mongoose.connect(DB_URL)
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required(),
    }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required(),
      name: Joi.string()
        .min(2)
        .max(30),
      about: Joi.string()
        .min(2)
        .max(200),
      avatar: Joi.string()
        .custom(validateUrl),
    }),
}), createUser);

app.use(authMiddleware);
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundedError(ErrorMessages.Routes.NOT_FOUND));
});

app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

app.listen(EXPRESS_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server has been started at port: ${EXPRESS_PORT}`);
});
