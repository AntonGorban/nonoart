import type express from 'express';

import { f } from '@nono-art/utils';

import { context, logger } from '../services';

export const traceEndpointMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const ctx = context.getStore();

  const startTime = ctx?.startTime;

  const startDate = !!startTime && !Number.isNaN(startTime) && startTime >= 1 ? new Date(startTime) : null;

  logger.trace(`==================== STARTED ====================`);

  if (!!startDate) {
    logger.trace(`start date: ${f.date(startDate, { withMilliseconds: true })}`);
  }

  res.on('finish', () => {
    if (!!startDate) {
      const finishDate = new Date();
      logger.trace(
        `${f.date(finishDate, { withMilliseconds: true })} | finished in ${f.number(finishDate.getTime() - startDate.getTime())}ms`,
      );
    }

    logger.trace(`==================== FINISHED ====================`);
  });

  next();
};
