import type { models } from '../../../db';

import type { R } from './types.auth.user.controller';

export const prepareResponse = (
  user: models.User,
  accessToken: string,
  refreshToken: string,
): NonNullable<R['auth']> => ({
  user: prepareUser(user),
  accessToken,
  refreshToken,
});

/* -------------------------------------------------------------------------- */

export const prepareUser = ({ id, login, role }: models.User): NonNullable<R['auth']>['user'] => ({
  id,
  login,
  role,
});
