import type { REST } from '@nono-art/api-types';

import type { ControllerFn } from '../../../core';

export type P = REST.user.signOut.P;
export type Q = REST.user.signOut.Q;
export type B = REST.user.signOut.B;
export type R = REST.user.signOut.R;

export type Fn = ControllerFn<P, Q, B, R>;
