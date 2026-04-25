import type { models } from '../../../db';

import type { R } from './types.signIn.user.controller';

export const prepareResponse = (user: models.User, accessToken: string, refreshToken: string): R => ({
  user: prepareUser(user),
  accessToken,
  refreshToken,
});

/* -------------------------------------------------------------------------- */

export const prepareUser = ({ id, login, role }: models.User): R['user'] => ({
  id,
  login,
  role,
});
