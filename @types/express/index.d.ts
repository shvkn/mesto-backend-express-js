import { IJwtToken } from '../../src/shared/types';

declare global {
  namespace Express {
    interface Request {
      user: IJwtToken;
    }
  }
}
