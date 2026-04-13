import * as http from 'http';

import { logger } from '../../services';

let isShuttingDown = false;

export const gracefulShutdown = (signal: string, server: http.Server, timeoutMs: number) => (error?: unknown) => {
  if (isShuttingDown) {
    logger.warn(`Graceful shutdown already in progress, ignoring ${signal}`);
    return;
  }
  isShuttingDown = true;

  if (!!error) {
    logger.fatal(`[${signal}] Shutdown due to error:`, error);
  } else {
    logger.info(`[${signal}] Received shutdown signal`);
  }

  // Принудительное завершение после таймаута
  const timer = setTimeout(() => {
    logger.error(`Forced shutdown after ${timeoutMs}ms timeout`);
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
  }, timeoutMs);

  server.close(() => {
    clearTimeout(timer);
    logger.info('HTTP server closed gracefully');
    // eslint-disable-next-line n/no-process-exit
    process.exit(!!error ? 1 : 0);
  });

  // Если сервер уже не слушает (например, ошибка запуска), завершаем сразу
  if (!server.listening) {
    server.close();
  }
};
