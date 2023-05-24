import { NextFunction, Request, Response } from 'express';

import Card from '../models/card';

export const getCards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    next(error);
  }
};
