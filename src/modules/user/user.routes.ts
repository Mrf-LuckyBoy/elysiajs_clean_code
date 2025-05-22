import { Elysia } from 'elysia';
import { userController } from '@/modules/user/controller/user.controller';
// import { middleware } from '@/core/middleware';
import { HttpResponse } from '@/core/http.response';
import { Jwt } from '@/core/jwt';

export const userRoute = new Elysia({ prefix: '/users' })
  .onBeforeHandle(async ({ cookie: { auth_token }, set }) => {
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
  })
  // .use(middleware)
  .get('/:id', userController.getById.handler, userController.getById.schema)
  .get('/', userController.gets.handler, userController.gets.Schema)
  .post('/', userController.create.handler, userController.create.schema)
  .put('/', userController.update.handler, userController.update.schema)
  .delete('/:id', userController.delete.handler, userController.delete.schema)