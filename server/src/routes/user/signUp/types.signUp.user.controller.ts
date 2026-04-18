import type { REST } from '@nono-art/api-types';

import type { ControllerFn } from '../../../core';

export type P = REST.user.signUp.P;
export type Q = REST.user.signUp.Q;
export type B = REST.user.signUp.B;
export type R = REST.user.signUp.R;

export type Fn = ControllerFn<P, Q, B, R>;
