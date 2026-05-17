import { tokenService } from '../../../services';

import { prepareResponse } from './transformers.auth.user.controller';
import type { Fn } from './types.auth.user.controller';

export const fn: Fn = async ({ utils, req }) => {
  const { user } = req;
  if (!user) return { auth: null };

  const newPayload: tokenService.TokenPayload = { userId: user.id, role: user.role };
  const newAccessToken = tokenService.generate.accessToken(newPayload);
  const newRefreshToken = tokenService.generate.refreshToken(newPayload);

  utils.setAccessTokenCookie(newAccessToken);
  utils.setRefreshTokenCookie(newRefreshToken);

  return { auth: prepareResponse(user, newAccessToken, newRefreshToken) };
};
