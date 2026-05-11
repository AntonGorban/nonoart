import z from 'zod';

import { createZod } from '../utils';

export const emptyObject = createZod<{}>()(z.object({}).readonly());

export const strictEmptyObject = createZod<{}>()(z.object({}).strict().readonly());
