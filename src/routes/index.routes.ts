import Elysia from 'elysia';

import { userRoute } from '../modules/user/user.routes';
import { authRoute } from '@/modules/auth/auth.routes';

const routes = new Elysia({ prefix: 'api/v1' }).use(authRoute).use(userRoute);

export { routes as AppRoutes };
