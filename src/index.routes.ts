import Elysia from 'elysia';

import { userRoute } from './routes/user.routes';
import { authRoute } from './routes/auth.routes';

const routes = new Elysia({ prefix: 'api/v1' }).use(userRoute).use(authRoute);

export { routes as AppRoutes };
