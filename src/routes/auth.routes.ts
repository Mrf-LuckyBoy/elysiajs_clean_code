import Elysia from 'elysia';
// import { HttpResponse } from '@/core/http.response';
// import { Jwt } from '@/core/jwt';

import { personRoute } from '@/modules/register/register.router';
import { dropdownRoute } from '@/modules/dropdown/dropdown.routes';
import { profileRoute } from '@/modules/profile/profile.routes';
import { screeningRoute } from '@/modules/screening/screening.routes';

const routesAuth = new Elysia({ prefix: 'api/v1' })
  // .onBeforeHandle(async ({ cookie: { auth_token }, set }) => {
  //   const token = auth_token.value;
  //   if (!token) {
  //     set.status = 401;
  //     return HttpResponse.unauthorized('Missing auth token');
  //   }

  //   const decoded = await Jwt.verify(token);
  //   if (!decoded) {
  //     set.status = 401;
  //     return HttpResponse.unauthorized('Invalid or expired token');
  //   }
  // })
  .use(personRoute)
  .use(dropdownRoute)
  .use(profileRoute)
  .use(screeningRoute);

export { routesAuth as AppAuthRoutes };
