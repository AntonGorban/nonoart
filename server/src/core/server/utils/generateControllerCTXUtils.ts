import type express from 'express';

import type { ControllerCTXUtils } from '../types';

import { clearAccessTokenCookie } from './clearAccessTokenCookie';
import { clearRefreshTokenCookie } from './clearRefreshTokenCookie';
import { setAccessTokenCookie } from './setAccessTokenCookie';
import { setRefreshTokenCookie } from './setRefreshTokenCookie';

export const generateControllerCTXUtils = (res: express.Response): ControllerCTXUtils => ({
  setAccessTokenCookie: (token: string) => setAccessTokenCookie(res, token),
  setRefreshTokenCookie: (token: string) => setRefreshTokenCookie(res, token),
  clearAccessTokenCookie: () => clearAccessTokenCookie(res),
  clearRefreshTokenCookie: () => clearRefreshTokenCookie(res),
});
