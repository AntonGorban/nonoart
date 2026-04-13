import type { Transaction } from 'sequelize';

export interface ControllerCTX<P, Q, B> {
  readonly params: P;
  readonly query: Q;
  readonly body: B;
  readonly transaction: Transaction;
}

export type ControllerFn<P, Q, B, R> = (ctx: ControllerCTX<P, Q, B>) => Promise<R>;
