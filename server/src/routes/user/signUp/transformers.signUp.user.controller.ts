import type { models } from '../../../db';

import type { R } from './types.signUp.user.controller';

export const prepareResponse = (user: models.User, accessToken: string, refreshToken: string): R => ({
  user: prepareUser(user),
  accessToken,
  refreshToken,
});

/* -------------------------------------------------------------------------- */

export const prepareUser = ({ id, login }: models.User): R['user'] => ({
  id,
  login,
});
