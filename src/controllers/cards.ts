import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import Card from '../models/card';
import NotFoundedError from '../shared/errors/not-founded-error';
import { ErrorMessages } from '../shared/constants';
import ForbiddenError from '../shared/errors/forbidden-error';
import BadRequestError from '../shared/errors/bad-request-error';

export const getCards = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cards = await Card.find({})
      .populate(['likes', 'owner']);
    res.send(cards);
  } catch (error) {
    next(error);
  }
};

export const createCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    name,
    link,
  } = req.body;
  const owner = req.user._id;
  try {
    const card = await Card.create({
      name,
      owner,
      link,
    });
    res.status(201).send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(error.message));
    } else {
      next(error);
    }
  }
};

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  try {
    const card = await Card
      .findById(cardId)
      .orFail(new NotFoundedError(ErrorMessages.Card.NOT_FOUND));

    if (!card.owner.equals(userId)) {
      next(new ForbiddenError(ErrorMessages.Card.DELETE));
    } else {
      await card.remove();
      res.send(card);
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(error.message));
    } else {
      next(error);
    }
  }
};

export const likeCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    )
      .populate(['likes', 'owner']);
    if (!card) {
      next(new NotFoundedError(ErrorMessages.Card.NOT_FOUND));
    } else {
      res.send(card);
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(error.message));
    } else {
      next(error);
    }
  }
};

export const dislikeCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    )
      .populate(['likes', 'owner']);
    if (!card) {
      next(new NotFoundedError(ErrorMessages.Card.NOT_FOUND));
    } else {
      res.send(card);
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(error.message));
    } else {
      next(error);
    }
  }
};
