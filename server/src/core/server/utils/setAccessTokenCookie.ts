import type express from 'express';

import { environment } from '../../../environment';

export const setAccessTokenCookie = (res: express.Response, token: string) => {
  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: environment.isProd,
    sameSite: 'strict',
    maxAge: environment.JWT_ACCESS_EXPIRES_IN * 1000, // переводим секунды в миллисекунды
    path: '/',
    signed: true,
  });
};
