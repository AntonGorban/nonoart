import { UnauthorizedHTTPError } from '@/errors';

import { createLevel } from './queries.create.level.controller';
import { prepareResponse } from './transformers.create.level.controller';
import type { Fn } from './types.create.level.controller';

export const fn: Fn = async ({ body, user, transaction }) => {
  if (!user) throw new UnauthorizedHTTPError();

  const date = new Date();

  const level = await createLevel(
    {
      name: body.name,
      description: body.description,
      grid: body.grid,
      authorId: user.id,
      color0: body.colors[0],
      color1: body.colors[1],
      color2: body.colors[2],
    },
    date,
    transaction,
  );

  return prepareResponse(level);
};
