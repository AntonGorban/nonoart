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

  PG_USER: str({
    desc: 'Имя пользователя для подключения к PostgreSQL',
    example: 'dev_user',
    docs: 'https://www.postgresql.org/docs/current/auth-username-maps.html',
  }),

  PG_PASSWORD: str({
    desc: 'Пароль пользователя PostgreSQL (чувствителен к регистру)',
    example: 'dev_password',
    docs: 'https://www.postgresql.org/docs/current/auth-password.html',
  }),

  PG_DB: str({
    desc: 'Имя базы данных, к которой будет выполнено подключение',
    example: 'dev_db',
    docs: 'https://www.postgresql.org/docs/current/manage-ag-templatedbs.html',
  }),

  PG_HOST: host({
    desc: 'Сетевой адрес сервера PostgreSQL (localhost, IP-адрес или доменное имя)',
    example: 'localhost',
    default: 'localhost',
    docs: 'https://www.postgresql.org/docs/current/runtime-config-connection.html',
  }),

  PG_PORT: port({
    desc: 'TCP-порт, на котором PostgreSQL принимает подключения',
    example: '5432',
    default: 5432,
    docs: 'https://www.postgresql.org/docs/current/runtime-config-connection.html#GUC-PORT',
  }),
});
