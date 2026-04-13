import type express from 'express';

import { NotFoundHTTPError } from '../errors';

export const pathNotFoundMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!res.headersSent) {
    throw new NotFoundHTTPError('путь не найден', {
      meta: {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.get('user-agent')?.slice(0, 200),
        referer: req.get('referer'),
        host: req.get('host'),
      },
    });
  }

  next();
};
