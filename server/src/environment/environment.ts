import { cleanEnv, port, url } from 'envalid';

export const environment = cleanEnv(process.env, {
  PORT: port({
    example: '7000',
    desc: 'Порт, на котором будет запущен сервер',
  }),

  URL: url({
    example: 'https://nonoart.antogor.ru',
    desc: 'URL, по которому будет доступны сервер и web-клиент',
  }),
});
