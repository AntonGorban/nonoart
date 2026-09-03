import { isEnumValueStrict } from '@nono-art/utils';

import { User } from '../User.domain';

/* -------------------------------------------------------------------------- */

export const id = (value: unknown): value is User.Id => typeof value === 'string';

/* -------------------------------------------------------------------------- */

export const login = (value: unknown): value is User.Login => typeof value === 'string';

/* -------------------------------------------------------------------------- */

export const role = (value: unknown): value is User.Role => isEnumValueStrict(User.Role, value);

/* -------------------------------------------------------------------------- */

export const accessToken = (value: unknown): value is string => typeof value === 'string';

/* -------------------------------------------------------------------------- */

export const refreshToken = (value: unknown): value is string => typeof value === 'string';
