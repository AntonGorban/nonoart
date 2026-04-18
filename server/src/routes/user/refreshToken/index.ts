import { wrapController } from '../../../core';

import { fn } from './refreshToken.user.controller';
import { bodyValidator, paramsValidator, queryValidator } from './validation.refreshToken.user.controller';

export const refreshTokenUserController = wrapController(paramsValidator, queryValidator, bodyValidator)(fn);
