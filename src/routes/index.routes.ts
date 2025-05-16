import Elysia from 'elysia';

import { userRoute } from '../modules/user/user.routes';
import { authRoute } from '@/modules/auth/auth.routes';

const routes = new Elysia({ prefix: 'api/v1' }).use(userRoute).use(authRoute);

export { routes as AppRoutes };
