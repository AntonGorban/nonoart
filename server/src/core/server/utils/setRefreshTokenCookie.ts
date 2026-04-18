import type express from 'express';

import { environment } from '../../../environment';

export const setRefreshTokenCookie = (res: express.Response, token: string) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: environment.isProd,
    sameSite: 'strict',
    maxAge: environment.JWT_REFRESH_EXPIRES_IN * 1000, // переводим секунды в миллисекунды
    path: '/',
    signed: true,
  });
};
