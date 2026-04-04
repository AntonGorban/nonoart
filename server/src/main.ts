import express from 'express';

import { utils } from '@nono-art/utils';

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'hello world',
    utils: utils(),
  });
});

server.listen(7000, () => {
  console.log('Server started on port 7000');
});
