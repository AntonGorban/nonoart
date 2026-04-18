import type express from 'express';

export const getRefreshToken = (req: express.Request): string | null => {
  const token: string | null = getRefreshTokenFromSignedCookies(req);
  if (!!token) return token;

  return null;
};

const getRefreshTokenFromSignedCookies = (req: express.Request): string | null => {
  const token = req.signedCookies['refreshToken'];

  if (!!token) return token;

  return null;
};
