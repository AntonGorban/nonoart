import { Op, type Transaction } from 'sequelize';
import z from 'zod';

import type { REST } from '@nono-art/api-types';
import { D } from '@nono-art/domain';
import { createZod, v } from '@nono-art/validation';

import { type ControllerFn, wrapController } from '@/core';
import { models } from '@/db';

/* -------------------------------------------------------------------------- */
/*                                 CONTROLLER                                 */
/* -------------------------------------------------------------------------- */

const fn: Fn = async ({ query, transaction }) => {
  const { disableSafetyMode } = query;
  const levelList = await getLevelList(disableSafetyMode ?? null, transaction);

  return prepareResponse(levelList);
};

/* -------------------------------------------------------------------------- */
/*                                / CONTROLLER                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   QUERIES                                  */
/* -------------------------------------------------------------------------- */

const getLevelList = (disableSafetyMode: boolean | null, transaction: Transaction) =>
  models.Level.findAll({
    where: {
      deletedAt: { [Op.is]: null },
      publishStatus: disableSafetyMode
        ? D.Level.PublishStatus.approved
        : { [Op.in]: [D.Level.PublishStatus.approved, D.Level.PublishStatus.review, D.Level.PublishStatus.rejected] },
    },
    transaction,
  });

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
  authorId: level.authorId,
  complexity: D.utils.level.calcArtComplexity(level.grid),
  createdAt: level.createdAt.getTime(),
  updatedAt: level.updatedAt.getTime(),
});

/* -------------------------------------------------------------------------- */
/*                               / TRANSFORMERS                               */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 VALIDATION                                 */
/* -------------------------------------------------------------------------- */

const paramsValidator: z.ZodType<P> = v.common.strictEmptyObject;

/* -------------------------------------------------------------------------- */

const queryValidator: z.ZodType<Q> = createZod<Q>()(
  z
    .object({
      disableSafetyMode: z.boolean().optional().nullable(),
    })
    .readonly(),
);

/* -------------------------------------------------------------------------- */

const bodyValidator: z.ZodType<B> = v.common.strictEmptyObject;

/* -------------------------------------------------------------------------- */
/*                                / VALIDATION                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type P = REST.level.getForGame.P;
type Q = REST.level.getForGame.Q;
type B = REST.level.getForGame.B;
type R = REST.level.getForGame.R;

type Fn = ControllerFn<P, Q, B, R>;

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */

export const getForGameLevelController = wrapController(paramsValidator, queryValidator, bodyValidator)(fn);
