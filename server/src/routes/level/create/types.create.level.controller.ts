import type { REST } from '@nono-art/api-types';

import type { ControllerFn } from '../../../core';

export type P = REST.level.create.P;
export type Q = REST.level.create.Q;
export type B = REST.level.create.B;
export type R = REST.level.create.R;

export type Fn = ControllerFn<P, Q, B, R>;
