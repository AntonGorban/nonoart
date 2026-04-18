import type express from 'express';
import type { Transaction } from 'sequelize';

export interface ControllerCTX<P, Q, B> {
  readonly params: P;
  readonly query: Q;
  readonly body: B;
  readonly transaction: Transaction;
  readonly req: express.Request;
  readonly res: express.Response;
}

export type ControllerFn<P, Q, B, R> = (ctx: ControllerCTX<P, Q, B>) => Promise<R>;
