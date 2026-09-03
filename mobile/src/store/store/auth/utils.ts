import { D } from '@nono-art/domain';
import { isObjectLike } from '@nono-art/utils';

import type { SerializedAuth, StoreAuth } from './types';

/* -------------------------------------------------------------------------- */
/*                                    UTILS                                   */
/* -------------------------------------------------------------------------- */

export const getAsyncStorageKey = (): string => `AUTH`;

/* -------------------------------------------------------------------------- */

export const parse = (str: string): unknown => {
  return JSON.parse(str);
};

/* -------------------------------------------------------------------------- */

export const stringify = (auth: SerializedAuth): string => {
  return JSON.stringify(auth);
};

/* -------------------------------------------------------------------------- */

export const normalize = (raw: unknown): SerializedAuth => {
  if (!isObjectLike(raw)) throw new Error('');

  const user = normalizeUser(raw['user']);
  const accessToken = D.normalizers.user.accessToken(raw['accessToken']);
  const refreshToken = D.normalizers.user.refreshToken(raw['refreshToken']);

  return { user, accessToken, refreshToken };
};

/* -------------------------------------------------------------------------- */

const normalizeUser = (raw: unknown): SerializedAuth['user'] => {
  if (!isObjectLike(raw)) return null;

  const id = D.normalizers.user.id(raw['id']);
  const login = D.normalizers.user.login(raw['login']);
  const role = D.normalizers.user.role(raw['role']);

  return { id, login, role };
};

/* -------------------------------------------------------------------------- */

export const deserialize = (auth: SerializedAuth): StoreAuth => auth;

/* -------------------------------------------------------------------------- */

export const serialize = (auth: StoreAuth): SerializedAuth => auth;

/* -------------------------------------------------------------------------- */
/*                                   / UTILS                                  */
/* -------------------------------------------------------------------------- */
