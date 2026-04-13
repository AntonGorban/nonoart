import type { models } from '../../../db';

import type { R } from './types.get.level.controller';

export const prepareResponse = (levelList: ReadonlyArray<models.Level>): R => levelList.map(prepareLevel);

const prepareLevel = (level: models.Level): R[0] => ({
  id: level.id,
  name: level.name,
  description: level.description,
  colors: level.colors,
  grid: level.grid,
  authorId: level.authorId,
  createdAt: level.createdAt.getTime(),
  updatedAt: level.updatedAt.getTime(),
  deletedAt: level.deletedAt?.getTime() ?? null,
});
