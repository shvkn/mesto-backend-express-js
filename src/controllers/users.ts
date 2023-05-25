import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User, { IUser } from '../models/user';
import NotFoundError from '../shared/not-found-error';
import { ErrorMessages } from '../shared/constants';
import AuthError from '../shared/auth-error';
import { HydratedDocument } from 'mongoose';

dotenv.config();
const {
  SALT_ROUNDS = 10,
  JWT_EXPIRES = 10080,
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
  const hash = await bcrypt.hash(password, Number(SALT_ROUNDS));
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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    email,
    password,
  } = req.body;

  if (NODE_ENV === 'production' && !JWT_SECRET) {
    next(new Error());
  }

  try {
    const user = await User.findOne({ email })
      .select('+password');
    if (!user) {
      next(new AuthError(ErrorMessages.WRONG_CREDENTIALS));
    } else {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET as string : 'dev-secret',
          { expiresIn: Number(JWT_EXPIRES) },
        );
        res.cookie('token', token, {
          maxAge: Number(JWT_EXPIRES),
          httpOnly: true,
        });
        res.send({
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        });
      } else {
        next(new AuthError(ErrorMessages.WRONG_CREDENTIALS));
      }
    }
  } catch (error) {
    next(error);
  }
};
