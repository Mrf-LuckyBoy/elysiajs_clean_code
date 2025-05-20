import { Elysia } from 'elysia';
import { Jwt } from '@/core/jwt';
import { HttpResponse } from './http.response';

export const middleware = new Elysia({}).onBeforeHandle(
  async ({ cookie: { auth_token }, set }) => {
    console.log('come IN ');
    const token = auth_token.value;
    if (!token) {
      set.status = 401;
      return HttpResponse.unauthorized('Missing auth token');
    }

    const decoded = await Jwt.verify(token);
    if (!decoded) {
      set.status = 401;
      return HttpResponse.unauthorized('Invalid or expired token');
    }
  }
);
