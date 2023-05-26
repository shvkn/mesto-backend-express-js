import { StatusCodes } from 'http-status-codes';
import HttpError from './http-error';

class ConflictError extends HttpError {
  statusCode: StatusCodes;

  constructor(message = '') {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
  }
}

export default ConflictError;
