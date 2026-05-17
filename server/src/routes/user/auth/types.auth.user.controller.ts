import type { REST } from '@nono-art/api-types';

import type { ControllerFn } from '../../../core';

export type P = REST.user.auth.P;
export type Q = REST.user.auth.Q;
export type B = REST.user.auth.B;
export type R = REST.user.auth.R;

export type Fn = ControllerFn<P, Q, B, R>;
