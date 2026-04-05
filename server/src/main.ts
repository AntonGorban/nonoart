import express from 'express';

import { utils } from '@nono-art/utils';

import { environment } from './environment';

const start = async (port: number, url: string) => {
  // eslint-disable-next-line no-console
  console.log(`=============== Welcome on ${url} ===============`);

  const server = express();

  server.use(express.json());

  server.get('/', async (req, res) => {
    res.status(200).json({
      status: 200,
      message: 'hello world',
      utils: utils(),
    });
  });

  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on port ${port}`);
  });
};

start(environment.PORT, environment.URL);
