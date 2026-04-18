import type { Transaction } from 'sequelize';

import { models } from '../../../db';

export const getUserList = (transaction: Transaction) => models.User.findAll({ transaction });
