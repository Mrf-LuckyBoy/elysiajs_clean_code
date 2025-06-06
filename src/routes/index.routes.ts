import Elysia from 'elysia';

import { userRoute } from '../modules/user/user.routes';

const routes = new Elysia({ prefix: 'api/v1' }).use(userRoute);

export { routes as AppRoutes };
