import type z from 'zod';

import { logger } from '../../../services';

export const validateWithLog =
  <T>(label: string) =>
  (validator: z.ZodType<T>) =>
  async (data: unknown): Promise<T> => {
    const startTime = new Date().getTime();

    try {
      logger.trace(`[VALIDATOR.${label}] started`);

      const result = await validator.parseAsync(data);
      const finishTime = new Date().getTime();

      logger.trace(`[VALIDATOR.${label}] finished | ${finishTime - startTime}ms`);

      return result;
    } catch (error) {
      const finishTime = new Date().getTime();
      logger.trace(`[VALIDATOR.${label}] errored | ${finishTime - startTime}ms`);

      throw error;
    }
  };
