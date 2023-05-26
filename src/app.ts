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
import NotFoundError from './shared/not-found-error';
import { ErrorMessages } from './shared/constants';

dotenv.config();
const {
  PORT = 3000,
  DB_URL = '',
} = process.env;

mongoose.connect(DB_URL)
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error);
  });

const app = express();

app.use(cookieParser());
app.use(express.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(authMiddleware);
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(ErrorMessages.WRONG_ROUTE));
});

app.use(errors());
app.use(errorMiddleware);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server has been started at port: ${PORT}`);
});
