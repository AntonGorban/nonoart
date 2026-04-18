import express from 'express';

import { levelRouter } from './level/level.router';
import { userRouter } from './user/user.router';

export const rootRouter = express();

rootRouter.use('/level', levelRouter);
rootRouter.use('/user', userRouter);
