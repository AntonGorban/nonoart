import winston from 'winston';

import { environment } from '../../environment';
import { context } from '../context';

import { logColors, logLevels } from './logLevels';

// Кастомный формат для добавления requestId из ALS (если есть)
const withRequestId = winston.format((info) => {
  const requestId = context.getRequestId();
  if (requestId) {
    info['requestId'] = requestId;
  }
  return info;
})();

// Формат для вывода в консоль (человекочитаемый)
const consoleFormat = winston.format.printf(({ level, message, timestamp, requestId, durationMs, ...meta }) => {
  let log = `${timestamp} [${level}]`;
  if (requestId) log += ` [reqID:${requestId}]`;
  if (!!durationMs && typeof durationMs === 'number') log += ` (${durationMs}ms)`;
  log += `: ${message}`;
  if (Object.keys(meta).length) {
    log += ` ${JSON.stringify(meta)}`;
  }
  return log;
});

winston.addColors(logColors);

// Формат для JSON (продакшен)
const jsonFormat = winston.format.json();

// Базовый массив форматов (общие для всех сред)
const baseFormats = [
  withRequestId,
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
];

// Добавляем финальный формат в зависимости от окружения
const finalFormat = environment.isProd
  ? winston.format.combine(...baseFormats, jsonFormat)
  : winston.format.combine(...baseFormats, winston.format.colorize({ all: true }), consoleFormat);

export const logger = winston.createLogger({
  levels: logLevels,
  level: environment.SERVER_LOG_LEVEL,
  format: finalFormat,
  transports: [new winston.transports.Console()],
});

declare module 'winston' {
  interface Logger {
    fatal: winston.LeveledLogMethod;
    unhandled: winston.LeveledLogMethod;
    suspicious: winston.LeveledLogMethod;
    notice: winston.LeveledLogMethod;
    sql: winston.LeveledLogMethod;
    trace: winston.LeveledLogMethod;
  }
}
