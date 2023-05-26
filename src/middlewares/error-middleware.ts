import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../shared/errors/http-error';
import { ErrorMessages } from '../shared/constants';

const errorMiddleware = (
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const {
    INTERNAL_SERVER_ERROR,
  } = StatusCodes;
  const { statusCode = INTERNAL_SERVER_ERROR } = err;
  const message = statusCode === INTERNAL_SERVER_ERROR
    ? ErrorMessages.SERVER_ERROR
    : err.message;
  res.status(statusCode)
    .send({ message });
};

export default errorMiddleware;
