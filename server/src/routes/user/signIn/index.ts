import { wrapController } from '../../../core';

import { fn } from './signIn.user.controller';
import { bodyValidator, paramsValidator, queryValidator } from './validation.signIn.user.controller';

export const signInUserController = wrapController(paramsValidator, queryValidator, bodyValidator)(fn);
