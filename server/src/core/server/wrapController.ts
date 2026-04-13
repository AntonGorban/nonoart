import type express from 'express';
import type { Transaction } from 'sequelize';
import type z from 'zod';

import { db } from '../../db';

import type { ControllerCTX, ControllerFn } from './types';

export const wrapController =
  <P, Q, B, R>(paramsValidator: z.ZodType<P>, queryValidator: z.ZodType<Q>, bodyValidator: z.ZodType<B>) =>
  (fn: ControllerFn<P, Q, B, R>) =>
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let transaction: Transaction | null = null;

    try {
      const [params, query, body] = await Promise.all([
        paramsValidator.parseAsync(req.params),
        queryValidator.parseAsync(req.query),
        bodyValidator.parseAsync(req.body),
      ]);

      transaction = await db.transaction();

      const ctx: ControllerCTX<P, Q, B> = {
        params,
        query,
        body,
        transaction,
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
