import * as http from 'http';

import { environment } from '../../environment';

import { gracefulShutdown } from './gracefulShutdown';

export const setupGracefulShutdown = (server: http.Server) => {
  const shutdownHandler = gracefulShutdown('server', server, environment.GRACEFUL_SHUTDOWN_TIMEOUT_MS);

  process.on('SIGTERM', () => shutdownHandler());
  process.on('SIGINT', () => shutdownHandler());
  process.on('uncaughtException', (error) => shutdownHandler(error));
  process.on('unhandledRejection', (reason) =>
    shutdownHandler(reason instanceof Error ? reason : new Error(String(reason))),
  );
};
