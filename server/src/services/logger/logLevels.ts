export const logLevels = {
  fatal: 0,
  error: 1,
  unhandled: 2, // ошибки, которые разработчик должен был обработать, но не сделал
  suspicious: 3, // подозрительные доменные ошибки (нельзя игнорировать)
  warn: 4,
  notice: 5, // штатные доменные ошибки (можно игнорировать)
  info: 6,
  http: 7,
  sql: 8,
  debug: 9,
  trace: 10,
};

export const logColors = {
  fatal: 'red',
  error: 'red',
  unhandled: 'red',
  suspicious: 'yellow',
  warn: 'yellow',
  notice: 'cyan',
  info: 'green',
  http: 'magenta',
  sql: 'cyan',
  debug: 'blue',
  trace: 'gray',
} satisfies Record<keyof typeof logLevels, string>;

export type LogLevel = keyof typeof logLevels;
