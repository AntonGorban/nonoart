import type { Transaction } from 'sequelize';
import z from 'zod';

import type { REST } from '@nono-art/api-types';
import type { D } from '@nono-art/domain';
import { createZod, v } from '@nono-art/validation';

import { type ControllerFn, wrapController } from '@/core';
import { models } from '@/db';
import { UnauthorizedHTTPError } from '@/errors';

/* -------------------------------------------------------------------------- */
/*                                 CONTROLLER                                 */
/* -------------------------------------------------------------------------- */

const fn: Fn = async ({ body, user, transaction }) => {
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

/* -------------------------------------------------------------------------- */
/*                                / CONTROLLER                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   QUERIES                                  */
/* -------------------------------------------------------------------------- */

const createLevel = (
  data: {
    readonly name: D.Level.Name;
    readonly description: D.Level.Description;
    readonly grid: D.Level.Grid;
    readonly authorId: D.Level.AuthorID;
    readonly color0: D.Level.Color;
    readonly color1: D.Level.Color;
    readonly color2: D.Level.Color;
  },
  date: Date,
  transaction: Transaction,
) =>
  models.Level.create(
    {
      ...data,
      createdAt: date,
      updatedAt: date,
    },
    { transaction },
  );

/* -------------------------------------------------------------------------- */
/*                                  / QUERIES                                 */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                TRANSFORMERS                                */
/* -------------------------------------------------------------------------- */

const prepareResponse = (level: models.Level): R => ({
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

/* -------------------------------------------------------------------------- */
/*                               / TRANSFORMERS                               */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 VALIDATION                                 */
/* -------------------------------------------------------------------------- */

const paramsValidator: z.ZodType<P> = v.common.strictEmptyObject;

/* -------------------------------------------------------------------------- */

const queryValidator: z.ZodType<Q> = v.common.emptyObject;

/* -------------------------------------------------------------------------- */

const bodyValidator: z.ZodType<B> = createZod<B>()(
  z
    .object({
      name: v.level.name,
      description: v.level.description,
      colors: v.level.colors,
      grid: v.level.grid,
    })
    .strict()
    .readonly(),
);

/* -------------------------------------------------------------------------- */
/*                                / VALIDATION                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type P = REST.level.create.P;
type Q = REST.level.create.Q;
type B = REST.level.create.B;
type R = REST.level.create.R;

type Fn = ControllerFn<P, Q, B, R>;

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */

export const createLevelController = wrapController(paramsValidator, queryValidator, bodyValidator)(fn);
