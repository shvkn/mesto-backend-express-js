import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ms from 'ms';

import User from '../models/user';
import NotFoundError from '../shared/errors/not-found-error';
import AuthError from '../shared/errors/auth-error';
import { ErrorMessages } from '../shared/constants';
import { IJwtToken } from '../shared/types';

dotenv.config();
const {
  SALT_ROUNDS = 10,
  JWT_EXPIRES = '7d',
  JWT_SECRET,
  NODE_ENV,
} = process.env;

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
    const user = await User
      .findById(userId)
      .orFail(new NotFoundError(ErrorMessages.User.NOT_FOUND));
    res.send(user);
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
  const hash = await bcrypt.hash(password, Number(SALT_ROUNDS));
  try {
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    });
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
    const fields = {
      name,
      about,
    };
    const options = {
      new: true,
      runValidators: true,
    };
    const user = await User
      .findByIdAndUpdate(userId, fields, options)
      .orFail(new NotFoundError(ErrorMessages.User.NOT_FOUND));
    res.send(user);
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
  const options = {
    new: true,
    runValidators: true,
  };
  try {
    const user = await User
      .findByIdAndUpdate(userId, { avatar }, options)
      .orFail(new NotFoundError(ErrorMessages.User.NOT_FOUND));
    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    email,
    password,
  } = req.body;
  const secret = NODE_ENV === 'production'
    ? JWT_SECRET as string
    : 'dev-secret';
  try {
    const {
      password: hash,
      ...user
    } = await User.findOne({ email })
      .select('+password')
      .lean()
      .orFail(new AuthError(ErrorMessages.Auth.WRONG_CREDENTIALS));

    const matched = await bcrypt.compare(password, hash);
    if (!matched) {
      next(new AuthError(ErrorMessages.Auth.WRONG_CREDENTIALS));
    } else {
      const payload: IJwtToken = { _id: user._id };
      const token = jwt.sign(
        payload,
        secret,
        { expiresIn: ms(JWT_EXPIRES) / 1000 },
      );
      res.cookie('token', token, {
        maxAge: ms(JWT_EXPIRES),
        httpOnly: true,
      });
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user._id;
  try {
    const user = await User
      .findById(userId)
      .orFail(new NotFoundError(ErrorMessages.User.NOT_FOUND));
    res.send(user);
  } catch (error) {
    next(error);
  }
};
