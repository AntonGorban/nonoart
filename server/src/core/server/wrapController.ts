import type express from 'express';
import type { Transaction } from 'sequelize';
import type z from 'zod';

import { db } from '../../db';
import { logger } from '../../services';

import type { ControllerCTX, ControllerFn } from './types';
import { validateWithLog } from './utils';

export const wrapController =
  <P, Q, B, R>(paramsValidator: z.ZodType<P>, queryValidator: z.ZodType<Q>, bodyValidator: z.ZodType<B>) =>
  (fn: ControllerFn<P, Q, B, R>) =>
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let transaction: Transaction | null = null;

    try {
      const startValidationTime = new Date().getTime();
      logger.trace(`[VALIDATOR] started`);
      const [params, query, body] = await Promise.all([
        validateWithLog<P>('params')(paramsValidator)(req.params),
        validateWithLog<Q>('query')(queryValidator)(req.query),
        validateWithLog<B>('body')(bodyValidator)(req.body),
      ]);
      const finishValidationTime = new Date().getTime();
      logger.trace(`[VALIDATOR] finished | ${finishValidationTime - startValidationTime}ms`);

      transaction = await db.transaction();

      const ctx: ControllerCTX<P, Q, B> = {
        params,
        query,
        body,
        transaction,
        req,
        res,
      };

      const response = await fn(ctx);

      await transaction.commit();
      res.status(200).json(response);
      next();
    } catch (error) {
      await transaction?.rollback();
      next(error);
    }
  };
