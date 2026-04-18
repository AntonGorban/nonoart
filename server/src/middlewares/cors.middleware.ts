import cors from 'cors';

export const corsMiddleware = cors({
  origin: '*',
  methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
});
