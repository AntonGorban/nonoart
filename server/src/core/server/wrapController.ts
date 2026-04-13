import type express from 'express';
import type { Transaction } from 'sequelize';

import { db } from '../../db';

import type { ControllerCTX, ControllerFn } from './types';

export const wrapController =
  <P, Q, B, R>(
    paramsValidator: (params: unknown) => P,
    queryValidator: (query: unknown) => Q,
    bodyValidator: (body: unknown) => B,
  ) =>
  (fn: ControllerFn<P, Q, B, R>) =>
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let transaction: Transaction | null = null;

    try {
      transaction = await db.transaction();

      const params = paramsValidator(req.params) satisfies P;
      const query = queryValidator(req.query) satisfies Q;
      const body = bodyValidator(req.body) satisfies B;

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
