import type express from 'express';

import { formatDate } from '@nono-art/utils';

import { context, logger } from '../services';

export const traceEndpointMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const ctx = context.getStore();

  const requestId = ctx?.requestId;
  const startTime = ctx?.startTime;

  const startDate = !!startTime && !Number.isNaN(startTime) && startTime >= 1 ? new Date(startTime) : null;

  if (!!requestId) {
    logger.trace(`=============== STARTED | reqId:${requestId} ===============`);

    if (!!startDate) {
      logger.trace(`${formatDate(startDate)} | reqId:${requestId}`);
    }
  }

  res.on('finish', () => {
    if (!!requestId) {
      if (!!startDate) {
        const finishDate = new Date();
        logger.trace(
          `${formatDate(finishDate)} | finished in ${finishDate.getTime() - startDate.getTime()}ms | reqId:${requestId}`,
        );
      }

      logger.trace(`=============== FINISHED | reqId:${requestId} ===============`);
    }
  });

  next();
};
