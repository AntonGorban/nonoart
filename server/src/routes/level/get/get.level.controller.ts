import { getLevelList } from './queries.get.level.controller';
import { prepareResponse } from './transformers.get.level.controller';
import type { Fn } from './types.get.level.controller';

export const fn: Fn = async ({ transaction }) => {
  const levelList = await getLevelList(transaction);

  return prepareResponse(levelList);
};
