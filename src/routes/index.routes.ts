import Elysia from 'elysia';

import { userRoute } from '../modules/user/user.routes';
import { authRoute } from '@/modules/auth/auth.routes';
import { profileRoute } from '@/modules/profile/profile.routes';

const routes = new Elysia({ prefix: 'api/v1' }).use(authRoute).use(userRoute).use(profileRoute);

export { routes as AppRoutes };
