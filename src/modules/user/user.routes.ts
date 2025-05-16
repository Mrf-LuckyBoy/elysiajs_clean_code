import { Elysia } from 'elysia';
import { userController } from '@/modules/user/controller/user.controller';

export const userRoute = new Elysia({ prefix: '/users' })
  .get('/:id', userController.getById.handler, userController.getById.schema)
  .get('/', userController.gets.handler, userController.gets.Schema)
  .post('/', userController.create.handler, userController.create.schema)
  .put('/', userController.update.handler, userController.update.schema)
  .delete('/:id', userController.delete.handler, userController.delete.schema);
