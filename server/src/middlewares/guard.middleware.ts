import type express from 'express';

import type { D } from '@nono-art/domain';

import { ForbiddenHTTPError, UnauthorizedHTTPError } from '../errors';

type GuardRole = D.User.Role | null;

type GuardRolesInput = GuardRole | ReadonlyArray<GuardRole>;

const normalizeRoles = (input?: GuardRolesInput): ReadonlyArray<D.User.Role> => {
  if (!input) return [];

  if (Array.isArray(input)) {
    return input.filter((role) => !!role);
  }

  if (typeof input === 'string') {
    return [input];
  }

  return [];
};

export const guardMiddleware = (rolesInput?: GuardRolesInput): express.RequestHandler => {
  const roles = normalizeRoles(rolesInput);

  return (req, res, next) => {
    if (!req.user) {
      return next(new UnauthorizedHTTPError('требуется аутентификация'));
    }

    if (roles.length > 0 && !roles.includes(req.user.role)) {
      return next(new ForbiddenHTTPError('недостаточно прав'));
    }

    return next();
  };
};
