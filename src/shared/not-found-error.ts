import { StatusCodes } from 'http-status-codes';

import { ErrorNames } from './constants';

class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.name = ErrorNames.NOT_FOUND_ERR;
  }
}

export default NotFoundError;
