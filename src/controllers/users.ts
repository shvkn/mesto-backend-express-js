import { NextFunction, Request, Response } from 'express';

import User from '../models/user';

// eslint-disable-next-line import/prefer-default-export
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
};
