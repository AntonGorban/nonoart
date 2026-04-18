import { getUserList } from './queries.get.user.controller';
import { prepareResponse } from './transformers.get.user.controller';
import type { Fn } from './types.get.user.controller';

export const fn: Fn = async ({ transaction }) => {
  const userList = await getUserList(transaction);

  return prepareResponse(userList);
};
