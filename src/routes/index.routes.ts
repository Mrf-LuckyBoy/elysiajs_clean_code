import Elysia from 'elysia';

import { userRoute } from '../modules/user/user.routes';
import { authRoute } from '@/modules/auth/auth.routes';
import { profileRoute } from '@/modules/profile/profile.routes';
import { screeningRoute } from '@/modules/screening/screening.routes';

const routes = new Elysia({ prefix: 'api/v1' }).use(authRoute).use(userRoute).use(profileRoute).use(screeningRoute);

export { routes as AppRoutes };
