import bcrypt from 'bcrypt';

import { environment } from '../../../environment';
import { BadRequestHTTPError, BaseError } from '../../../errors';
import { logger, tokenService } from '../../../services';

import { getUser } from './queries.signIn.user.controller';
import { prepareResponse } from './transformers.signIn.user.controller';
import type { Fn } from './types.signIn.user.controller';

export const fn: Fn = async ({ body, transaction, utils }) => {
  const user = await getUser({ login: body.login }, transaction);
  if (!user) throw new BadRequestHTTPError('неверный логин или пароль', { meta: { login: body.login } });

  const isPasswordValid = await bcrypt.compare(body.password + environment.SALT, user.password);

  if (!isPasswordValid) {
    const error = new BadRequestHTTPError('неверный логин или пароль', { meta: { login: body.login } });
    logger.suspicious(new BaseError('неверный пароль', { cause: error }).toString());
    throw error;
  }

  const payload: tokenService.TokenPayload = { userId: user.id };
  const accessToken = tokenService.generate.accessToken(payload);
  const refreshToken = tokenService.generate.refreshToken(payload);

  utils.setAccessTokenCookie(accessToken);
  utils.setRefreshTokenCookie(refreshToken);

  return prepareResponse(user, accessToken, refreshToken);
};
