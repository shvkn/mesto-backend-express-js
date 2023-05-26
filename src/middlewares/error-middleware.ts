import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ErrorMessages } from '../shared/constants';
import AuthError from '../shared/errors/auth-error';
import ForbiddenError from '../shared/errors/forbidden-error';
import NotFoundError from '../shared/errors/not-found-error';

const errorMiddleware = (
  err: Error | mongoose.Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const {
    NOT_FOUND,
    UNAUTHORIZED,
    INTERNAL_SERVER_ERROR,
    FORBIDDEN,
    BAD_REQUEST,
    CONFLICT,
  } = StatusCodes;

  let { message } = err;
  if (err instanceof NotFoundError) {
    res.status(NOT_FOUND);
  } else if (err instanceof mongoose.Error.ValidationError) {
    if (err.errors?.email?.kind === 'unique') {
      res.status(CONFLICT);
    } else {
      res.status(BAD_REQUEST);
    }
  } else if (err instanceof AuthError) {
    message = message.length > 0 ? message : ErrorMessages.Auth.DEFAULT;
    res.status(UNAUTHORIZED);
  } else if (err instanceof ForbiddenError) {
    res.status(FORBIDDEN);
  } else {
    message = ErrorMessages.DEFAULT;
    res.status(INTERNAL_SERVER_ERROR);
  }

  res.send({ message });
};

export default errorMiddleware;
