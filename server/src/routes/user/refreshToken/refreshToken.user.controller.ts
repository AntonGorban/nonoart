import { BaseError, ForbiddenHTTPError, UnauthorizedHTTPError } from '../../../errors';
import { logger, tokenService } from '../../../services';

import { getUser } from './queries.refreshToken.user.controller';
import { prepareResponse } from './transformers.refreshToken.user.controller';
import type { Fn } from './types.refreshToken.user.controller';

export const fn: Fn = async ({ body, transaction, utils, req }) => {
  const refreshToken = req.signedCookies['refreshToken'] || req.cookies['refreshToken'] || body.refreshToken;

  if (!!req.cookies['refreshToken']) {
    logger.suspicious(
      new BaseError('токен находится в неподписанных cookies', {
        meta: {
          signedCookies: req.signedCookies['refreshToken'],
          cookies: req.cookies['refreshToken'],
          body: body.refreshToken,
        },
      }).toString(),
    );
  }

  if (!refreshToken)
    throw new UnauthorizedHTTPError('нет токена', {
      meta: {
        signedCookies: req.signedCookies['refreshToken'],
        cookies: req.cookies['refreshToken'],
        body: body.refreshToken,
      },
    });

  const payload = tokenService.verify.refreshToken(refreshToken);
  if (!payload) {
    const error = new ForbiddenHTTPError('невалидный или просроченный токен', { meta: { refreshToken, payload } });
    logger.suspicious(
      new BaseError('нет токена', {
        meta: {
          signedCookies: req.signedCookies['refreshToken'],
          cookies: req.cookies['refreshToken'],
          body: body.refreshToken,
        },
      }).toString(),
    );
    throw error;
  }

  if (typeof payload === 'string') {
    const error = new ForbiddenHTTPError('невалидный или просроченный токен', { meta: { refreshToken, payload } });
    logger.suspicious(
      new BaseError('токен это строка', {
        meta: {
          signedCookies: req.signedCookies['refreshToken'],
          cookies: req.cookies['refreshToken'],
          body: body.refreshToken,
        },
      }).toString(),
    );
    throw error;
  }

  const { userId } = payload as Partial<tokenService.TokenPayload>;

  if (!userId) {
    const error = new ForbiddenHTTPError('невалидный или просроченный токен', {
      meta: { refreshToken, payload, userId },
    });
    logger.suspicious(
      new BaseError('токен не имеет userId', {
        meta: {
          signedCookies: req.signedCookies['refreshToken'],
          cookies: req.cookies['refreshToken'],
          body: body.refreshToken,
        },
      }).toString(),
    );
    throw error;
  }

  const user = await getUser(userId, transaction);
  if (!user) {
    const error = new ForbiddenHTTPError('нет такого пользователя', {
      meta: { refreshToken, payload, userId, user },
    });
    logger.suspicious(
      new BaseError('пользователь по токену не найден', {
        meta: {
          signedCookies: req.signedCookies['refreshToken'],
          cookies: req.cookies['refreshToken'],
          body: body.refreshToken,
        },
      }).toString(),
    );
    throw error;
  }

  const newPayload: tokenService.TokenPayload = { userId: user.id };
  const newAccessToken = tokenService.generate.accessToken(newPayload);
  const newRefreshToken = tokenService.generate.refreshToken(newPayload);

  utils.setAccessTokenCookie(newAccessToken);
  utils.setRefreshTokenCookie(newRefreshToken);

  return prepareResponse(user, newAccessToken, newRefreshToken);
};
