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
