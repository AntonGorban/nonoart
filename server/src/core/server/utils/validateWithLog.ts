import type z from 'zod';

import { f } from '@nono-art/utils';

import { logger } from '../../../services';

export const validateWithLog =
  <T>(label: string) =>
  (validator: z.ZodType<T>) =>
  async (data: unknown): Promise<T> => {
    const startTime = Date.now();

    try {
      logger.trace(`[VALIDATOR.${label}] started`);

      const result = await validator.parseAsync(data);
      const finishTime = Date.now();

      logger.trace(`[VALIDATOR.${label}] finished | ${f.number(finishTime - startTime)}ms`);

      return result;
    } catch (error) {
      const finishTime = Date.now();
      logger.trace(`[VALIDATOR.${label}] errored | ${f.number(finishTime - startTime)}ms`);

      throw error;
    }
  };
