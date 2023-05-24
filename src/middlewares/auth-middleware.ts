import { NextFunction, Request, Response } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '646c789479fdd607bfb49ed5',
  };
  next();
};

export default authMiddleware;
