import type { Transaction } from 'sequelize';
import type z from 'zod';

import type { REST } from '@nono-art/api-types';
import { v } from '@nono-art/validation';

import { type ControllerFn, wrapController } from '@/core';
import { models } from '@/db';

/* -------------------------------------------------------------------------- */
/*                                 CONTROLLER                                 */
/* -------------------------------------------------------------------------- */

const fn: Fn = async ({ transaction }) => {
  const levelList = await getLevelList(transaction);

  return prepareResponse(levelList);
};

/* -------------------------------------------------------------------------- */
/*                                / CONTROLLER                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   QUERIES                                  */
/* -------------------------------------------------------------------------- */

const getLevelList = (transaction: Transaction) => models.Level.findAll({ transaction });

/* -------------------------------------------------------------------------- */
/*                                  / QUERIES                                 */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                TRANSFORMERS                                */
/* -------------------------------------------------------------------------- */

const prepareResponse = (levelList: ReadonlyArray<models.Level>): R => levelList.map(prepareLevel);

const prepareLevel = (level: models.Level): R[number] => ({
  id: level.id,
  name: level.name,
  description: level.description,
  publishStatus: level.publishStatus,
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

const bodyValidator: z.ZodType<B> = v.common.strictEmptyObject;

/* -------------------------------------------------------------------------- */
/*                                / VALIDATION                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type P = REST.level.get.P;
type Q = REST.level.get.Q;
type B = REST.level.get.B;
type R = REST.level.get.R;

type Fn = ControllerFn<P, Q, B, R>;

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */

export const getLevelController = wrapController(paramsValidator, queryValidator, bodyValidator)(fn);
