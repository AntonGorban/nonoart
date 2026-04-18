import type { Transaction } from 'sequelize';

import type { D } from '@nono-art/domain';

import { models } from '../../../db';

export const createLevel = (
  data: {
    readonly name: D.Level.Name;
    readonly description: D.Level.Description;
    readonly grid: D.Level.Grid;
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
