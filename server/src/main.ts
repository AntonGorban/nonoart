import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { db, models } from './db';
import { environment } from './environment';
import { BaseError, ForbiddenHTTPError, NotFoundHTTPError } from './errors';
import { errorHandlerMiddleware, morganLoggerMiddleware, requestContextMiddleware } from './middlewares';
import { logger } from './services';
import { setupGracefulShutdown } from './utils';

const createApp = () => {
  const app = express();

  // Безопасность и production-настройки
  if (environment.isProd) {
    app.use(helmet());
  }

  app.use(
    cors({
      origin: '*',
      methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      credentials: true,
    }),
  );

  app.use(express.json({ limit: '10mb' }));

  app.use(requestContextMiddleware);

  app.use(morganLoggerMiddleware);

  app.get('/', async (req, res) => {
    logger.fatal('fatal');
    logger.error('error');
    logger.warn('warn');
    logger.info('info');
    logger.http('http');
    logger.sql('sql');
    logger.debug('debug');
    logger.trace('trace');

    throw new ForbiddenHTTPError('Привет');

    res.status(200).json({
      status: 200,
      message: 'hello world',
    });
  });

  // 404 handler
  app.use((req, _res) => {
    throw new NotFoundHTTPError('путь не найден', { meta: { path: req.path } });
  });

  app.use(errorHandlerMiddleware);

  return app;
};

const start = async (port: number, host: string) => {
  logger.info(`=============== Welcome on ${environment.URL} ===============`);
  const app = createApp();

  logger.info('Connecting to database');
  await db.authenticate();
  await Promise.all([models.User.sync({ alter: true }), models.Level.sync({ alter: true })]);
  logger.info('Connecting to database successfully');

  const server = app.listen(port, host, (err?: Error) => {
    if (err) throw new BaseError('Server error', { cause: err, meta: { app, server, db } });

    logger.info(`Server started on ${host}:${port} (${environment.NODE_ENV} mode)`);
  });

  server.on('error', (err) => {
    const error = new BaseError('Server error', { cause: err, meta: { app, server, db } });
    logger.fatal(error.toString());
    process.emit('uncaughtException', error);
  });

  setupGracefulShutdown(server);
  return server;
};

start(environment.PORT, environment.HOST).catch((err) => {
  const error = new BaseError('Failed to start server', err);
  logger.fatal(error.toString());
  // eslint-disable-next-line n/no-process-exit
  process.exit(1);
});
