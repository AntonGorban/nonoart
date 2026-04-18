import * as jwt from 'jsonwebtoken';

import { environment } from '../../../environment';
import type { TokenPayload } from '../types';

export const generateAccessToken = (payload: TokenPayload): string =>
  jwt.sign(payload, environment.JWT_ACCESS_SECRET, {
    expiresIn: environment.JWT_ACCESS_EXPIRES_IN,
  });
