import type { models } from '../../../db';

import type { R } from './types.create.level.controller';

export const prepareResponse = (level: models.Level): R => ({
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
