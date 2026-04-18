import type { models } from '../../../db';

import type { R } from './types.get.user.controller';

export const prepareResponse = (userList: ReadonlyArray<models.User>): R => userList.map(prepareUser);

const prepareUser = (user: models.User): R[0] => ({
  id: user.id,
  login: user.login,
  createdAt: user.createdAt.getTime(),
  updatedAt: user.updatedAt.getTime(),
  deletedAt: user.deletedAt?.getTime() ?? null,
});
