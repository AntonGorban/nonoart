import morgan from 'morgan';

import { logger } from '../services';

// Стрим для передачи логов Morgan в Winston
const morganStream = {
  write: (message: string) => {
    // Morgan добавляет символ новой строки, убираем его
    logger.http(message.trim());
  },
};

// Формат Morgan с временем выполнения запроса
// :method :url :status :response-time ms - :res[content-length]
const morganFormat = ':method :url :status :response-time ms - :res[content-length]';

// Middleware для логирования HTTP-запросов через Morgan
export const morganLoggerMiddleware = morgan(morganFormat, { stream: morganStream });
