import { wrapController } from '../../../core';

import { fn } from './signUp.user.controller';
import { bodyValidator, paramsValidator, queryValidator } from './validation.signUp.user.controller';

export const signUpUserController = wrapController(paramsValidator, queryValidator, bodyValidator)(fn);
