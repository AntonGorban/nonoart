import type { REST } from '@nono-art/api-types';

import type { ControllerFn } from '../../../core';

export type P = REST.level.get.P;
export type Q = REST.level.get.Q;
export type B = REST.level.get.B;
export type R = REST.level.get.R;

export type Fn = ControllerFn<P, Q, B, R>;
