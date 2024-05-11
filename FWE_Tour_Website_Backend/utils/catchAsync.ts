import { Request, Response, NextFunction } from 'express';

type AsyncRequestHandler  = (req: Request, res: Response, next: NextFunction) => Promise<any>;

module.exports = (fn:AsyncRequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

