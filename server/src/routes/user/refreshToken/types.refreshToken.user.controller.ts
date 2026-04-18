import type { REST } from '@nono-art/api-types';

import type { ControllerFn } from '../../../core';

export type P = REST.user.refreshToken.P;
export type Q = REST.user.refreshToken.Q;
export type B = REST.user.refreshToken.B;
export type R = REST.user.refreshToken.R;

export type Fn = ControllerFn<P, Q, B, R>;
