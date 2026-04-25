import type express from 'express';

import { setAccessTokenCookie, setRefreshTokenCookie } from '../core';
import { logger, tokenService } from '../services';

export const refreshTokensMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const user = req.user ?? null;

  logger.debug(`user: ${user?.id ?? null} | ${user?.role ?? null}`);

  if (!!user) {
    const payload: tokenService.TokenPayload = { userId: user.id, role: user.role };
    const accessToken = tokenService.generate.accessToken(payload);
    const refreshToken = tokenService.generate.refreshToken(payload);

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
  }

  next();
};
