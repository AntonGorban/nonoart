import { wrapController } from '../../../core';

import { fn } from './get.level.controller';
import { bodyValidator, paramsValidator, queryValidator } from './validation.get.level.controller';

export const getLevelController = wrapController(paramsValidator, queryValidator, bodyValidator)(fn);
