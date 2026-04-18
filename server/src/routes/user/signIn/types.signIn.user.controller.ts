import type { REST } from '@nono-art/api-types';

import type { ControllerFn } from '../../../core';

export type P = REST.user.signIn.P;
export type Q = REST.user.signIn.Q;
export type B = REST.user.signIn.B;
export type R = REST.user.signIn.R;

export type Fn = ControllerFn<P, Q, B, R>;
