import { Sequelize } from 'sequelize-typescript';

import { environment } from '../environment';

import { Level } from './models';

export const db = new Sequelize({
  dialect: 'postgres',
  host: environment.PG_HOST,
  port: environment.PG_PORT,
  username: environment.PG_USER,
  password: environment.PG_PASSWORD,
  database: environment.PG_DB,
  timezone: '+03:00',
  models: [Level],
});
