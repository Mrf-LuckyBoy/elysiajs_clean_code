import Elysia from 'elysia';

import { userRoute } from '../modules/user/user.routes';
import { authRoute } from '@/modules/auth/auth.routes';
import { personRoute } from '@/modules/register/register.router';

const routes = new Elysia({ prefix: 'api/v1' })
  .use(authRoute)
  .use(userRoute)
  .use(personRoute);

export { routes as AppRoutes };
