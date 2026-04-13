import type express from 'express';
import {
  ConnectionError,
  DatabaseError,
  ForeignKeyConstraintError,
  BaseError as SequelizeBaseError,
  ValidationError as SequelizeValidationError,
  UniqueConstraintError,
} from 'sequelize';

import {
  BadRequestHTTPError,
  BaseError,
  ConflictHTTPError,
  HTTPError,
  InternalServerErrorHTTPError,
  ServiceUnavailableHTTPError,
} from '../errors';
import { logger } from '../services';
import { HttpStatus } from '../types';

export const errorHandlerMiddleware: express.ErrorRequestHandler = (
  error: unknown,
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) => {
  try {
    /* -------------------------------------------------------------------------- */
    /*                                 HTTP ERROR                                 */
    /* -------------------------------------------------------------------------- */

    if (error instanceof HTTPError) throw error;

    /* -------------------------------------------------------------------------- */
    /*                                / HTTP ERROR                                */
    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                 BASE ERROR                                 */
    /* -------------------------------------------------------------------------- */

    if (error instanceof BaseError) {
      logger.unhandled(error.toString());

      throw new InternalServerErrorHTTPError('что-то пошло не так', error);
    }

    /* -------------------------------------------------------------------------- */
    /*                                / BASE ERROR                                */
    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                     ZOD                                    */
    /* -------------------------------------------------------------------------- */

    // if (error instanceof ZodError) {
    //   throw new BadRequestHTTPError(
    //     error.errors
    //       .map((e) => ({
    //         path: e.path.join('.'),
    //         message: e.message,
    //       }))
    //       .join(';'),
    //     error,
    //   );
    // }

    /* -------------------------------------------------------------------------- */
    /*                                    / ZOD                                   */
    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                  SEQUELIZE                                 */
    /* -------------------------------------------------------------------------- */

    if (error instanceof UniqueConstraintError) {
      const err = new BaseError('[DB.CONFLICT] Resource already exists', {
        cause: error,
        meta: { details: error.errors.map((e) => ({ field: e.path, message: e.message })) },
      });

      logger.unhandled(err.toString());

      throw new ConflictHTTPError('ресурс уже существует', err);
    }

    /* -------------------------------------------------------------------------- */

    if (error instanceof ForeignKeyConstraintError) {
      const err = new BaseError('[DB.FOREIGN_KEY_ERROR] Related resource does not exist', {
        cause: error,
        meta: { fields: error.fields },
      });

      logger.unhandled(err.toString());

      throw new BadRequestHTTPError('ресурс не существует', err);
    }

    /* -------------------------------------------------------------------------- */

    if (error instanceof SequelizeValidationError) {
      const err = new BaseError('[DB.VALIDATION_ERROR] Database validation failed', {
        cause: error,
        meta: { details: error.errors.map((e) => ({ field: e.path, message: e.message })) },
      });

      logger.unhandled(err.toString());

      throw new BadRequestHTTPError('ошибка валидации', err);
    }

    /* -------------------------------------------------------------------------- */

    if (error instanceof ConnectionError || error instanceof DatabaseError) {
      const err = new BaseError('[DB.DATABASE_ERROR] Database service unavailable', {
        cause: error,
        meta: { details: error.message },
      });

      logger.error(err.toString());

      throw new ServiceUnavailableHTTPError('сервис недоступен', err);
    }

    /* -------------------------------------------------------------------------- */

    if (error instanceof SequelizeBaseError) {
      const err = new BaseError('[DB.DATABASE_ERROR] Database error occurred', {
        cause: error,
      });

      logger.error(err.toString());

      throw new InternalServerErrorHTTPError('что-то пошло не так', err);
    }

    /* -------------------------------------------------------------------------- */
    /*                                 / SEQUELIZE                                */
    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   EXPRESS                                  */
    /* -------------------------------------------------------------------------- */

    if (error instanceof SyntaxError && 'status' in error && error.status === 400) {
      const err = new BaseError('[EXPRESS.INVALID_JSON] Invalid JSON payload', {
        cause: error,
      });

      logger.suspicious(err.toString());

      throw new BadRequestHTTPError('некорректный формат данных', err);
    }

    /* -------------------------------------------------------------------------- */
    /*                                  / EXPRESS                                 */
    /* -------------------------------------------------------------------------- */
  } catch (error: unknown) {
    if (error instanceof HTTPError) {
      logger.notice(error.toString());

      res.status(error.status).json({
        status: error.status,
        message: error.message,
      });
    } else {
      logger.unhandled(new BaseError('Uncaught error on error handler middleware', { cause: error }).toString());
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'что-то пошло не так',
      });
    }
  }
};
