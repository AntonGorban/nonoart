import * as jwt from 'jsonwebtoken';

import { environment } from '../../../environment';
import { BaseError } from '../../../errors';
import { logger } from '../../logger';

export const verifyRefreshToken = (token: string): jwt.JwtPayload | string | null => {
  try {
    return jwt.verify(token, environment.JWT_REFRESH_SECRET);
  } catch {
    logger.suspicious(new BaseError('невалидный refreshToken', { meta: { token } }).toString());
    return null;
  }
};
