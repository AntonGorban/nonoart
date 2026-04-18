import type { Transaction } from 'sequelize';

import type { D } from '@nono-art/domain';

import { models } from '../../../db';

export const getUser = (id: D.User.Id, transaction: Transaction) => models.User.findOne({ where: { id }, transaction });
