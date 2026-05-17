import { wrapController } from '../../../core';

import { fn } from './auth.user.controller';
import { bodyValidator, paramsValidator, queryValidator } from './validation.auth.user.controller';

export const authUserController = wrapController(paramsValidator, queryValidator, bodyValidator)(fn);
