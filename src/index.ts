import { Elysia } from 'elysia';
import logger from 'logixlysia';
import swagger from '@elysiajs/swagger';
import { ENV } from '@/config/env';
import { AppRoutes } from './routes/index.routes';
import { AppAuthRoutes } from './routes/auth.routes';
import { HttpResponse } from '@/core/http.response';
import { corsMiddleware } from '@/core/cors';

const app = new Elysia()
  .use(logger())
  .use(corsMiddleware)
  .use(
    swagger({
      exclude: ['/swagger'],
      autoDarkMode: true,
      documentation: {
        info: {
          title: '🦊 parent care api doc',
          description: 'this is swagger document api',
          version: '1.0.0-alpha',
        },
      },
    })
  )
  .use(AppRoutes)
  .use(AppAuthRoutes)
  .onError(({ code, error }) => {
    console.log(error);
    if (code === 'NOT_FOUND') {
      return HttpResponse.notFound();
    }
    return HttpResponse.error('Something went wrong.');
  });

app.listen({ port: ENV.SERVER_PORT });

console.log(`🦊 Elysia server is running at port ${ENV.SERVER_PORT || 3000}`);
