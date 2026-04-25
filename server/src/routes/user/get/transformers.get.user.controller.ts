import type { models } from '../../../db';

import type { R } from './types.get.user.controller';

export const prepareResponse = (userList: ReadonlyArray<models.User>): R => userList.map(prepareUser);

const prepareUser = ({ id, login, role, createdAt, updatedAt, deletedAt }: models.User): R[0] => ({
  id,
  login,
  role,
  createdAt: createdAt.getTime(),
  updatedAt: updatedAt.getTime(),
  deletedAt: deletedAt?.getTime() ?? null,
});
