import type { Transaction } from 'sequelize';
import z from 'zod';

import type { REST } from '@nono-art/api-types';
import type { D } from '@nono-art/domain';
import { createZod, v } from '@nono-art/validation';

import { type ControllerFn, wrapController } from '@/core';
import { models } from '@/db';
import { NotFoundHTTPError } from '@/errors';

/* -------------------------------------------------------------------------- */
/*                                 CONTROLLER                                 */
/* -------------------------------------------------------------------------- */

const fn: Fn = async ({ params, transaction }) => {
  const user = await getUserById(params.id, transaction);

  if (!user) throw new NotFoundHTTPError('пользователь не найден');

  const authorLevelsCount = await getAuthorLevelsCount(user.id, transaction);

  return prepareResponse(user, authorLevelsCount);
};

/* -------------------------------------------------------------------------- */
/*                                / CONTROLLER                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   QUERIES                                  */
/* -------------------------------------------------------------------------- */

const getUserById = (id: D.User.Id, transaction: Transaction) => models.User.findByPk(id, { transaction });

const getAuthorLevelsCount = (authorId: D.Level.AuthorID, transaction: Transaction) =>
  models.Level.count({ where: { authorId }, transaction });

/* -------------------------------------------------------------------------- */
/*                                  / QUERIES                                 */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                TRANSFORMERS                                */
/* -------------------------------------------------------------------------- */

const prepareResponse = (user: models.User, authorLevelsCount: number): R => ({
  id: user.id,
  login: user.login,
  role: user.role,
  authorLevelsCount,
  createdAt: user.createdAt.getTime(),
  updatedAt: user.updatedAt.getTime(),
  deletedAt: user.deletedAt?.getTime() ?? null,
});

/* -------------------------------------------------------------------------- */
/*                               / TRANSFORMERS                               */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 VALIDATION                                 */
/* -------------------------------------------------------------------------- */

/* --------------------------------- params --------------------------------- */

const paramsValidator: z.ZodType<P> = createZod<P>()(
  z
    .object({
      id: v.user.id,
    })
    .strict()
    .required(),
);

/* -------------------------------- / params -------------------------------- */

/* ---------------------------------- query --------------------------------- */

const queryValidator: z.ZodType<Q> = v.common.emptyObject;

/* --------------------------------- / query -------------------------------- */

/* ---------------------------------- body ---------------------------------- */

const bodyValidator: z.ZodType<B> = v.common.strictEmptyObject;

/* --------------------------------- / body --------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                / VALIDATION                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type P = REST.user.getVerbose.P;
type Q = REST.user.getVerbose.Q;
type B = REST.user.getVerbose.B;
type R = REST.user.getVerbose.R;

type Fn = ControllerFn<P, Q, B, R>;

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */

export const getVerboseUserController = wrapController(paramsValidator, queryValidator, bodyValidator)(fn);
