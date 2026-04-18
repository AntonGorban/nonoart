import { wrapController } from '../../../core';

import { fn } from './get.user.controller';
import { bodyValidator, paramsValidator, queryValidator } from './validation.get.user.controller';

export const getUserController = wrapController(paramsValidator, queryValidator, bodyValidator)(fn);
