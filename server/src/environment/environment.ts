import { cleanEnv, host, num, port, str, url } from 'envalid';

export const environment = cleanEnv(process.env, {
  PORT: port({
    example: '7000',
    desc: 'Порт, на котором будет запущен сервер',
  }),

  HOST: host({
    example: 'nonoart.antogor.ru',
    desc: 'Хост, на котором работает сервер и web-клиент',
  }),

  URL: url({
    example: 'https://nonoart.antogor.ru',
    desc: 'URL, по которому будет доступны сервер и web-клиент',
  }),

  NODE_ENV: str({
    choices: ['production', 'development', 'test'],
  }),

  GRACEFUL_SHUTDOWN_TIMEOUT_MS: num({
    default: 10000,
    example: '10000',
    desc: 'Таймаут принудительного отключения сервера при аварийном отключении',
  }),
});
