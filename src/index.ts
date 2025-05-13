import { Elysia } from 'elysia';
import logger from 'logixlysia';
import swagger from '@elysiajs/swagger';
import { ENV } from '@/config/env';
import { AppRoutes } from './index.routes';

const app = new Elysia()
  .use(logger())
  .use(
    swagger({
      exclude: ['/swagger'],
      autoDarkMode: true,
      documentation: {
        info: {
          title: '🦊 this is title',
          description: 'this is description',
          version: 'this is version',
        },
      },
    })
  )
  .use(AppRoutes);

app.listen({ port: ENV.SERVER_PORT });

console.log(
  `🦊 Elysia server is running at http://localhost:${ENV.SERVER_PORT || 3000}`
);
