export const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  http: 4,
  sql: 5,
  debug: 6,
  trace: 7,
};

export const logColors = {
  fatal: 'red',
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  sql: 'cyan',
  debug: 'blue',
  trace: 'gray',
} satisfies Record<keyof typeof logLevels, string>;

export type LogLevel = keyof typeof logLevels;
