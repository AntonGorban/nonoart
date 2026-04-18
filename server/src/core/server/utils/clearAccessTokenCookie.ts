import type express from 'express';

import { environment } from '../../../environment';

export const clearAccessTokenCookie = (res: express.Response) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: environment.isProd,
    sameSite: 'strict',
    path: '/',
    signed: true,
  });
};
