import { StatusCodes } from 'http-status-codes';
import HttpError from './http-error';

class BadRequestError extends HttpError {
  statusCode: StatusCodes;

  constructor(message = '') {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
