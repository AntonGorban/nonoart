import z from 'zod';

import { createZod } from '../utils';

export const emptyObject = createZod<{}>()(z.object({}).readonly());

export const strictEmptyObject = createZod<{}>()(z.object({}).strict().readonly());

export const booleanFromQuery = () =>
  createZod<boolean>()(
    z
      .union([z.boolean(), z.enum(['true', 'false', '1', '0'])])
      .transform((v) => v === true || v === 'true' || v === '1'),
  );
