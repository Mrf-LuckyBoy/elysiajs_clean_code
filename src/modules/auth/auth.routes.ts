import { Elysia } from 'elysia';
import { authController } from './controller/auth.controller';

export const authRoute = new Elysia({ prefix: '/auth' }).post(
  '/loginProvinder',
  authController.loginProviderID.handler,
  authController.loginProviderID.Schema
);
