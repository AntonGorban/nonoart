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

export const fn: Fn = async ({ params, transaction }) => {
  const user = await getUserById(params.id, transaction);

  if (!user) throw new NotFoundHTTPError('пользователь не найден');

  return prepareResponse(user);
};

/* -------------------------------------------------------------------------- */
/*                                / CONTROLLER                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   QUERIES                                  */
/* -------------------------------------------------------------------------- */

export const getUserById = (id: D.User.Id, transaction: Transaction) => models.User.findByPk(id, { transaction });

/* -------------------------------------------------------------------------- */
/*                                  / QUERIES                                 */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                TRANSFORMERS                                */
/* -------------------------------------------------------------------------- */

export const prepareResponse = (user: models.User): R => ({
  id: user.id,
  login: user.login,
});

/* -------------------------------------------------------------------------- */
/*                               / TRANSFORMERS                               */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 VALIDATION                                 */
/* -------------------------------------------------------------------------- */

/* --------------------------------- params --------------------------------- */

export const paramsValidator: z.ZodType<P> = createZod<P>()(
  z
    .object({
      id: v.user.id,
    })
    .strict()
    .required(),
);

/* -------------------------------- / params -------------------------------- */

/* ---------------------------------- query --------------------------------- */

export const queryValidator: z.ZodType<Q> = v.common.emptyObject;

/* --------------------------------- / query -------------------------------- */

/* ---------------------------------- body ---------------------------------- */

export const bodyValidator: z.ZodType<B> = v.common.strictEmptyObject;

/* --------------------------------- / body --------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                / VALIDATION                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export type P = REST.user.getCompact.P;
export type Q = REST.user.getCompact.Q;
export type B = REST.user.getCompact.B;
export type R = REST.user.getCompact.R;

export type Fn = ControllerFn<P, Q, B, R>;

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */

export const getCompactUserController = wrapController(paramsValidator, queryValidator, bodyValidator)(fn);
