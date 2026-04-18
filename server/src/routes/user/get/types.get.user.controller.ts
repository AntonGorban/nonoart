import type { REST } from '@nono-art/api-types';

import type { ControllerFn } from '../../../core';

export type P = REST.user.get.P;
export type Q = REST.user.get.Q;
export type B = REST.user.get.B;
export type R = REST.user.get.R;

export type Fn = ControllerFn<P, Q, B, R>;
