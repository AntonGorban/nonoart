import { wrapController } from '../../../core';

import { fn } from './signOut.user.controller';
import { bodyValidator, paramsValidator, queryValidator } from './validation.signOut.user.controller';

export const signOutUserController = wrapController(paramsValidator, queryValidator, bodyValidator)(fn);
