import type z from 'zod';

import type { AssertExact } from './types';

export const createZod =
  <T>() =>
  <S extends z.ZodType<T>>(schema: S & (AssertExact<z.infer<S>, T> extends true ? {} : never)): S =>
    schema;
