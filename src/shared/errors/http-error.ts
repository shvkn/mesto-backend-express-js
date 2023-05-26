import { StatusCodes } from 'http-status-codes';

class HttpError extends Error {
  statusCode: StatusCodes;

  constructor(message = '') {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export default HttpError;
