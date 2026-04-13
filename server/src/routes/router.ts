import express from 'express';

import { levelRouter } from './level/level.router';

export const rootRouter = express();

rootRouter.use('/level', levelRouter);
