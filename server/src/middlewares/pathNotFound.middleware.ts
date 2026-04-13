import type express from 'express';

import { NotFoundHTTPError } from '../errors';

export const pathNotFoundMiddleware = (req: express.Request, _res: express.Response, _next: express.NextFunction) => {
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
};
