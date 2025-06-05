import { Elysia } from 'elysia';
import logger from 'logixlysia';
import { swag } from '@/plugins/swagger.plugin';
import { ENV } from '@/config/env';
import { AppRoutes } from './routes/index.routes';
import { AppAuthRoutes } from './routes/auth.routes';
import { HttpResponse } from '@/core/http.response';
import { corsMiddleware } from '@/plugins/cors.plugin';

const app = new Elysia()
  .use(logger())
  .use(corsMiddleware)
  .use(swag)
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
