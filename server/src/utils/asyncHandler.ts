import { Response, NextFunction, RequestHandler } from 'express';

type AsyncRouteHandler = (req: any, res: Response, next: NextFunction) => Promise<unknown>;

export const asyncHandler = (fn: AsyncRouteHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
