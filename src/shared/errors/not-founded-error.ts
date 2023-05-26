import { StatusCodes } from 'http-status-codes';
import HttpError from './http-error';

class NotFoundedError extends HttpError {
  statusCode: number;

  constructor(message = '') {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundedError;
