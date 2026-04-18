import express from 'express';

import { enableMiddlewareTracing } from './core';
import { db, models } from './db';
import { environment } from './environment';
import { BaseError } from './errors';
import { middleware } from './middlewares';
import { rootRouter } from './routes';
import { logger } from './services';
import { setupGracefulShutdown } from './utils';

const createApp = () => {
  const app = express();

  /* --------------------------- before middlewares --------------------------- */

  // Безопасность и production-настройки
  if (environment.isProd) {
    app.use(middleware.helmet);
  }

  app.use(middleware.cors);
  app.use(middleware.json);
  app.use(middleware.fixBodyParser);
  app.use(middleware.cookieParser);
  app.use(middleware.requestContext);
  app.use(middleware.morganLogger);
  app.use(middleware.traceEndpoint);
  enableMiddlewareTracing(app);
  app.use(middleware.authenticate);
  app.use(middleware.refreshTokens);

  /* -------------------------- / before middlewares -------------------------- */

  /* --------------------------------- routes --------------------------------- */

  app.get('/', async (req, res) => {
    logger.fatal(`[0] fatal`);
    logger.error(`[1] error`);
    logger.unhandled(`[2] unhandled`);
    logger.suspicious(`[3] suspicious`);
    logger.warn(`[4] warn`);
    logger.notice(`[5] notice`);
    logger.info(`[6] info`);
    logger.http(`[7] http`);
    logger.sql(`[8] sql`);
    logger.debug(`[9] debug`);
    logger.trace(`[10] trace`);

    res.status(200).json({
      status: 200,
      message: 'hello world',
    });
  });

  app.use('/api', rootRouter);

  /* -------------------------------- / routes -------------------------------- */

  /* ---------------------------- after middlewares --------------------------- */

  // app.use(middleware.pathNotFound);

  app.use(middleware.errorHandler);

  /* --------------------------- / after middlewares -------------------------- */

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
