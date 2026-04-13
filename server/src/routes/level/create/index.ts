import { wrapController } from '../../../core';

import { fn } from './create.level.controller';
import { bodyValidator, paramsValidator, queryValidator } from './validation.create.level.controller';

export const createLevelController = wrapController(paramsValidator, queryValidator, bodyValidator)(fn);
