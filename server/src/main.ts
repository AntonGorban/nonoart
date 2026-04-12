import express from 'express';

import { db, models } from './db';
import { environment } from './environment';
import { setupGracefulShutdown } from './utils';

const createApp = () => {
  const app = express();

  app.use(express.json({ limit: '10mb' }));

  app.get('/', async (req, res) => {
    res.status(200).json({
      status: 200,
      message: 'hello world',
    });
  });

  return app;
};

const start = async (port: number, host: string) => {
  console.info(`=============== Welcome on ${environment.URL} ===============`);
  const app = createApp();

  console.info('Connecting to database');
  await db.authenticate();
  await Promise.all([models.Level.sync({ alter: true })]);
  console.info('Connecting to database successfully');

  const server = app.listen(port, host, (err?: Error) => {
    if (err) throw err;

    console.info(`Server started on ${host}:${port} (${environment.NODE_ENV} mode)`);
  });

  server.on('error', (err) => {
    console.error('Server error:', err);
    process.emit('uncaughtException', err);
  });

  setupGracefulShutdown(server);
  return server;
};

start(environment.PORT, environment.HOST).catch((err) => {
  console.error('Failed to start server:', err);
  // eslint-disable-next-line n/no-process-exit
  process.exit(1);
});
