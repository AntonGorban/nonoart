import bcrypt from 'bcrypt';

import { environment } from '../../../environment';
import { ConflictHTTPError } from '../../../errors';
import { tokenService } from '../../../services';

import { createUser, getUser } from './queries.signUp.user.controller';
import { prepareResponse } from './transformers.signUp.user.controller';
import type { Fn } from './types.signUp.user.controller';

export const fn: Fn = async ({ body, transaction, utils }) => {
  const existingUser = await getUser({ login: body.login }, transaction);
  if (!!existingUser) throw new ConflictHTTPError('регистрация не удалась', { meta: { login: body.login } });

  const date = new Date();

  const hashedPassword = await bcrypt.hash(body.password + environment.SALT, 10);
  const user = await createUser({ login: body.login, password: hashedPassword }, date, transaction);

  const payload: tokenService.TokenPayload = { userId: user.id, role: user.role };
  const accessToken = tokenService.generate.accessToken(payload);
  const refreshToken = tokenService.generate.refreshToken(payload);

  utils.setAccessTokenCookie(accessToken);
  utils.setRefreshTokenCookie(refreshToken);

  return prepareResponse(user, accessToken, refreshToken);
};
