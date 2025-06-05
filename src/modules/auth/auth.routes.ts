import { Elysia } from 'elysia';
import { authController } from './controller/auth.controller';

export const authRoute = new Elysia({ prefix: '/auth' })
  .post('/loginProvider', authController.loginProviderID.handler, authController.loginProviderID.Schema)
  .post('/login', authController.loginSetCookie.handler, authController.loginSetCookie.Schema)
  .post('/logout', authController.logoutRevmoveCookie.handler, authController.logoutRevmoveCookie.Schema)
  .put('/updateCid', authController.updateCid.handler, authController.updateCid.Schema);
