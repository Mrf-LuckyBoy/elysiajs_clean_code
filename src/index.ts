import { Elysia } from 'elysia';
import logger from 'logixlysia';
import swagger from '@elysiajs/swagger';
import { ENV } from '@/config/env';
import { AppRoutes } from './routes/index.routes';
import { HttpResponse } from '@/core/http.response';

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
  .use(AppRoutes)
  .onError(({ code, error }) => {
    console.log(error);
    if (code === 'NOT_FOUND') {
      return HttpResponse.notFound();
    }
    return HttpResponse.error('Something went wrong.');
  });

app.listen({ port: ENV.SERVER_PORT });

console.log(
  `🦊 Elysia server is running at http://localhost:${ENV.SERVER_PORT || 3000}`
);
