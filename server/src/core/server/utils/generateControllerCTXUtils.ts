import type express from 'express';

import type { ControllerCTXUtils } from '../types';

import { clearAccessTokenCookie } from './clearAccessTokenCookie';
import { clearRefreshTokenCookie } from './clearRefreshTokenCookie';
import { getAccessToken } from './getAccessToken';
import { getRefreshToken } from './getRefreshToken';
import { setAccessTokenCookie } from './setAccessTokenCookie';
import { setRefreshTokenCookie } from './setRefreshTokenCookie';

export const generateControllerCTXUtils = (req: express.Request, res: express.Response): ControllerCTXUtils => ({
  setAccessTokenCookie: (token: string) => setAccessTokenCookie(res, token),
  setRefreshTokenCookie: (token: string) => setRefreshTokenCookie(res, token),
  clearAccessTokenCookie: () => clearAccessTokenCookie(res),
  clearRefreshTokenCookie: () => clearRefreshTokenCookie(res),
  getAccessToken: () => getAccessToken(req),
  getRefreshToken: () => getRefreshToken(req),
});
