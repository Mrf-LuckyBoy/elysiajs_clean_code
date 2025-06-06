import Elysia from 'elysia';
import { HttpResponse } from '@/core/http.response';
import { Jwt } from '@/core/jwt';

const routesAuth = new Elysia({ prefix: 'api/v1' })
  .onBeforeHandle(async ({ cookie: { auth_token }, set }) => {
    const token = auth_token.value;
    if (!token) {
      set.status = 401;
      return HttpResponse.unauthorized('Missing auth token');
    }

    const decoded = await Jwt.verify(token);
    if (decoded === 'expired') {
      set.status = 401;
      return HttpResponse.unauthorized('Token expired');
    }

    if (decoded === 'invalid' || !decoded) {
      set.status = 401;
      return HttpResponse.unauthorized('Invalid token');
    }
  });

export { routesAuth as AppAuthRoutes };
