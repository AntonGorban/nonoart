import type { Fn } from './types.signOut.user.controller';

export const fn: Fn = async ({ utils }) => {
  utils.clearAccessTokenCookie();
  utils.clearRefreshTokenCookie();

  return {};
};
