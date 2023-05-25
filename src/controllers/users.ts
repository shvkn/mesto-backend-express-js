import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import User from '../models/user';
import NotFoundError from '../shared/not-found-error';
import { ErrorMessages } from '../shared/constants';

dotenv.config();
const { SALT_ROUNDS = 10 } = process.env;

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
  next: NextFunction,
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

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
  const hash = await bcrypt.hash(password, salt);
  try {
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user._id;
  const {
    name,
    about,
  } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        name,
        about,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      next(new NotFoundError(ErrorMessages.USER_NOT_FOUND));
    } else {
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      next(new NotFoundError(ErrorMessages.USER_NOT_FOUND));
    } else {
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
};
