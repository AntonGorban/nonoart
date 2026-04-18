import type express from 'express';

import { formatDate } from '@nono-art/utils';

import { context, logger } from '../services';

export const traceEndpointMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const ctx = context.getStore();

  const startTime = ctx?.startTime;

  const startDate = !!startTime && !Number.isNaN(startTime) && startTime >= 1 ? new Date(startTime) : null;

  logger.trace(`==================== STARTED ====================`);

  if (!!startDate) {
    logger.trace(`start date: ${formatDate(startDate)}`);
  }

  res.on('finish', () => {
    if (!!startDate) {
      const finishDate = new Date();
      logger.trace(`${formatDate(finishDate)} | finished in ${finishDate.getTime() - startDate.getTime()}ms`);
    }

    logger.trace(`==================== FINISHED ====================`);
  });

  next();
};
