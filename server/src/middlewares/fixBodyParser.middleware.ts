import type express from 'express';

export const fixBodyParserMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  req.body = req.body ?? {};
  next();
};
