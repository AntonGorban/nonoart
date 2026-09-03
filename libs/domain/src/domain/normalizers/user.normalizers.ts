import * as asserts from '../asserts';
import { User } from '../User.domain';

/* -------------------------------------------------------------------------- */

export const id = (value: unknown): User.Id => {
  if (asserts.user.id(value)) return value;
  throw new Error('Dad user id');
};

/* -------------------------------------------------------------------------- */

export const login = (value: unknown): User.Login => {
  if (asserts.user.login(value)) return value;
  return '';
};

/* -------------------------------------------------------------------------- */

export const role = (value: unknown): User.Role => {
  if (asserts.user.role(value)) return value;
  return User.Role.user;
};

/* -------------------------------------------------------------------------- */

export const accessToken = (value: unknown): string | null => {
  if (asserts.user.accessToken(value)) return value;
  return null;
};

/* -------------------------------------------------------------------------- */

export const refreshToken = (value: unknown): string | null => {
  if (asserts.user.accessToken(value)) return value;
  return null;
};
