import { NextFunction, Request, Response } from 'express';

import User from '../models/user';
import NotFoundError from '../shared/not-found-error';
import { ErrorMessages } from '../shared/constants';

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

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      next(new NotFoundError(ErrorMessages.USER_NOT_FOUND));
    } else {
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
};
