import { Elysia } from 'elysia';
import { authController } from './controller/auth.controller';

export const authRoute = new Elysia({ prefix: '/auth' })
  .post(
    '/loginProvider',
    authController.loginProviderID.Schema,
    authController.loginProviderID.handler
  )
  .post(
    '/login',
    authController.loginSetCookie.Schema,
    authController.loginSetCookie.handler
  )
  .put(
    '/updateCid',
    authController.updateCid.Schema,
    authController.updateCid.handler
  );
