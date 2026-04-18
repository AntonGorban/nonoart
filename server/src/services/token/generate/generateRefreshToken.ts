import * as jwt from 'jsonwebtoken';

import { environment } from '../../../environment';
import type { TokenPayload } from '../types';

export const generateRefreshToken = (payload: TokenPayload): string =>
  jwt.sign(payload, environment.JWT_REFRESH_SECRET, {
    expiresIn: environment.JWT_REFRESH_EXPIRES_IN,
  });
