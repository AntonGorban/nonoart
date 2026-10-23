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
  const userList = await getUserList(transaction);

  return prepareResponse(userList);
};

/* -------------------------------------------------------------------------- */
/*                                / CONTROLLER                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   QUERIES                                  */
/* -------------------------------------------------------------------------- */

const getUserList = (transaction: Transaction) => models.User.findAll({ order: [['login', 'ASC']], transaction });

/* -------------------------------------------------------------------------- */
/*                                  / QUERIES                                 */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                TRANSFORMERS                                */
/* -------------------------------------------------------------------------- */

const prepareResponse = (userList: ReadonlyArray<models.User>): R => userList.map(prepareUser);

const prepareUser = ({ id, login }: models.User): R[number] => ({
  id,
  login,
});

/* -------------------------------------------------------------------------- */
/*                               / TRANSFORMERS                               */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 VALIDATION                                 */
/* -------------------------------------------------------------------------- */

const paramsValidator: z.ZodType<P> = v.common.strictEmptyObject;

const queryValidator: z.ZodType<Q> = v.common.emptyObject;

const bodyValidator: z.ZodType<B> = v.common.strictEmptyObject;

/* -------------------------------------------------------------------------- */
/*                                / VALIDATION                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type P = REST.user.getAll.P;
type Q = REST.user.getAll.Q;
type B = REST.user.getAll.B;
type R = REST.user.getAll.R;

type Fn = ControllerFn<P, Q, B, R>;

/* -------------------------------------------------------------------------- */
/*                                   / TYPES                                  */
/* -------------------------------------------------------------------------- */

export const getAllUserController = wrapController(paramsValidator, queryValidator, bodyValidator)(fn);
