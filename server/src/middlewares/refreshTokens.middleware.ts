import type express from 'express';

import { setAccessTokenCookie, setRefreshTokenCookie } from '../core';
import { logger, tokenService } from '../services';

export const refreshTokensMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const userId = req.user?.id ?? null;

  logger.debug(`userId: ${userId}`);

  if (!!userId) {
    const payload: tokenService.TokenPayload = { userId };
    const accessToken = tokenService.generate.accessToken(payload);
    const refreshToken = tokenService.generate.refreshToken(payload);

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
  }

  next();
};
