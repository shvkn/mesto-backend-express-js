import { NextFunction, Request, Response } from 'express';

import Card from '../models/card';
import NotFoundError from '../shared/not-found-error';
import { ErrorMessages } from '../shared/constants';

export const getCards = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cards = await Card.find({}).populate(['likes', 'owner']);
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
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const card = await Card.create({ name, owner, link });
    res.send(card);
  } catch (error) {
    next(error);
  }
};

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndDelete(cardId).populate(['likes', 'owner']);
    if (!card) {
      next(new NotFoundError(ErrorMessages.CARD_NOT_FOUND));
    } else {
      res.send(card);
    }
  } catch (error) {
    next(error);
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
    ).populate(['likes', 'owner']);
    if (!card) {
      next(new NotFoundError(ErrorMessages.CARD_NOT_FOUND));
    } else {
      res.send(card);
    }
  } catch (error) {
    next(error);
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
    ).populate(['likes', 'owner']);
    if (!card) {
      next(new NotFoundError(ErrorMessages.CARD_NOT_FOUND));
    } else {
      res.send(card);
    }
  } catch (error) {
    next(error);
  }
};
