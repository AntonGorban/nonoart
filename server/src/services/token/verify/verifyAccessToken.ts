import * as jwt from 'jsonwebtoken';

import { environment } from '../../../environment';
import { BaseError } from '../../../errors';
import { logger } from '../../logger';

export const verifyAccessToken = (token: string): jwt.JwtPayload | string | null => {
  try {
    return jwt.verify(token, environment.JWT_ACCESS_SECRET);
  } catch {
    logger.suspicious(new BaseError('невалидный accessToken', { meta: { token } }).toString());
    return null;
  }
};
