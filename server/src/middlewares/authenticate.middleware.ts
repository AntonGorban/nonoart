import type express from 'express';

import type { D } from '@nono-art/domain';

import { getAccessToken, getRefreshToken } from '../core';
import { models } from '../db';
import { BaseError } from '../errors';
import { logger, tokenService } from '../services';

export const authenticateMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  let token: string | null = getAccessToken(req);

  let userId: D.User.Id | null = null;
  let user: models.User | null = null;

  if (!!token) {
    userId = verifyAccessToken(token);
  } else {
    token = getRefreshToken(req);
    if (!!token) {
      userId = verifyRefreshToken(token);
    }
  }

  if (!!userId) {
    user = await models.User.findOne({ where: { id: userId } });
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  req.user = user;

  next();
};

const verifyAccessToken = (token: string): D.User.Id | null => {
  try {
    const payload = tokenService.verify.accessToken(token);

    if (!payload) return null;
    if (typeof payload === 'string') return null;

    const userId = (payload as tokenService.TokenPayload).userId;

    return !!userId ? userId : null;
  } catch (error) {
    logger.suspicious(
      new BaseError('(accessToken) с токеном что-то не так ', { cause: error, meta: { token } }).toString(),
    );
    return null;
  }
};

const verifyRefreshToken = (token: string): D.User.Id | null => {
  try {
    const payload = tokenService.verify.refreshToken(token);

    if (!payload) return null;
    if (typeof payload === 'string') return null;

    const userId = (payload as tokenService.TokenPayload).userId;

    return !!userId ? userId : null;
  } catch (error) {
    logger.suspicious(
      new BaseError('(refreshToken) с токеном что-то не так ', { cause: error, meta: { token } }).toString(),
    );
    return null;
  }
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      readonly user?: models.User | null;
    }
  }
}
