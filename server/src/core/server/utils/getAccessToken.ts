import type express from 'express';

import { BaseError } from '../../../errors';
import { logger } from '../../../services';

export const getAccessToken = (req: express.Request): string | null => {
  let token: string | null = getAccessTokenFromSignedCookies(req);
  if (!!token) return token;

  token = getAccessTokenFromHeaders(req);
  if (!!token) return token;

  return null;
};

const getAccessTokenFromSignedCookies = (req: express.Request): string | null => {
  const token = req.signedCookies['accessToken'];

  if (!!token) return token;

  return null;
};

const getAccessTokenFromHeaders = (req: express.Request): string | null => {
  const tokenString = req.headers.authorization;

  if (!tokenString) return null;

  const splittedTokenString = tokenString.split(' ');
  if (splittedTokenString.length !== 2)
    logger.suspicious(
      new BaseError('(accessToken из headers).length !== 2', { meta: { tokenString, splittedTokenString } }).toString(),
    );

  const [prefix, token] = splittedTokenString;

  if (!prefix)
    logger.suspicious(
      new BaseError('(accessToken из headers) не имеет префикса', {
        meta: { tokenString, splittedTokenString, prefix },
      }).toString(),
    );
  else if (prefix !== 'Bearer')
    logger.suspicious(
      new BaseError("(accessToken из headers) префикс !== 'Bearer'", {
        meta: { tokenString, splittedTokenString, prefix },
      }).toString(),
    );

  if (!token) {
    logger.suspicious(
      new BaseError('(accessToken из headers) не имеет токена', {
        meta: { tokenString, splittedTokenString, prefix, token },
      }).toString(),
    );
    return null;
  }

  return token;
};
