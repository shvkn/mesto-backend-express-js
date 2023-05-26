import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import AuthError from '../shared/errors/auth-error';
import { IJwtToken } from '../shared/types';

dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const {
    JWT_SECRET,
    NODE_ENV,
  } = process.env;
  try {
    const payload = jwt.verify(
      req.cookies.token,
      NODE_ENV === 'production'
        ? JWT_SECRET as string
        : 'dev-secret',
    );
    req.user = payload as IJwtToken;
    next();
  } catch (error) {
    if (error instanceof Error) {
      next(new AuthError(error.message));
    } else {
      next(new AuthError(String(error)));
    }
  }
};

export default authMiddleware;
