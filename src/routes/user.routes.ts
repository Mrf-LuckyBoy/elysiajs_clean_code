import { Elysia } from 'elysia';
import { userController } from '@/modules/user/controller/user.controller';

export const userRoute = new Elysia({ prefix: '/users' })
  .get('/:id', userController.getById.handler, userController.getById.schema)
  .post('/', userController.create.handler, userController.create.schema);
