import Elysia from 'elysia';

import { userRoute } from '../modules/user/user.routes';
import { authRoute } from '@/modules/auth/auth.routes';
import { dropdownRoute } from '@/modules/dropdown/dropdown.routes';

const routes = new Elysia({ prefix: 'api/v1' })
  .use(authRoute)
  .use(userRoute)
  .use(dropdownRoute);

export { routes as AppRoutes };
