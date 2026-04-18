import type { Transaction } from 'sequelize';

import type { D } from '@nono-art/domain';

import { models } from '../../../db';

export const getUser = (
  {
    login,
  }: {
    readonly login: D.User.Login;
  },
  transaction: Transaction,
) => models.User.findOne({ where: { login }, transaction });

/* -------------------------------------------------------------------------- */

export const createUser = (
  data: {
    readonly login: D.User.Login;
    readonly password: string;
  },
  date: Date,
  transaction: Transaction,
) => models.User.create({ ...data, createdAt: date, updatedAt: date }, { transaction });
