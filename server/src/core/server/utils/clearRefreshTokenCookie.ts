import type express from 'express';

import { environment } from '../../../environment';

export const clearRefreshTokenCookie = (res: express.Response) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: environment.isProd,
    sameSite: 'strict',
    path: '/',
    signed: true,
  });
};
