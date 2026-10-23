import type express from 'express';
import type { Transaction } from 'sequelize';

import type { models } from '@/db';

export interface ControllerCTX<P, Q, B> {
  readonly params: P;
  readonly query: Q;
  readonly body: B;
  readonly transaction: Transaction;
  readonly utils: ControllerCTXUtils;
  readonly user: models.User | null;
  readonly req: express.Request;
  readonly res: express.Response;
}

export type ControllerFn<P, Q, B, R> = (ctx: ControllerCTX<P, Q, B>) => Promise<R>;

export interface ControllerCTXUtils {
  readonly setAccessTokenCookie: (token: string) => void;
  readonly setRefreshTokenCookie: (token: string) => void;
  readonly clearAccessTokenCookie: () => void;
  readonly clearRefreshTokenCookie: () => void;
  readonly getAccessToken: () => void;
  readonly getRefreshToken: () => void;
}
