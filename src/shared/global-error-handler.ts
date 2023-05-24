import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ErrorNames } from './constants';

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  const { message, name } = err;

  if (name === ErrorNames.NOT_FOUND_ERR) {
    res.status(StatusCodes.NOT_FOUND);
  } else if (name === ErrorNames.VALIDATION_ERR) {
    res.status(StatusCodes.BAD_REQUEST);
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
  res.send({ message });
};

export default globalErrorHandler;
