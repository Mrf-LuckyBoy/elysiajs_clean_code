import { cors } from '@elysiajs/cors';

export const corsMiddleware = cors({
  origin: [
    'http://127.0.0.1:5000',
    'http://localhost:4200',
    'https://uat-parentcare.one.th',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
