import express from 'express';

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'hello world',
  });
});

server.listen(7000, () => {
  console.log('Server started on port 7000');
});
