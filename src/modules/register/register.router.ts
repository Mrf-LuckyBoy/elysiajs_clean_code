import { Elysia } from 'elysia';
import { personController } from '@/modules/register/controller/person.controller';
// import { HttpResponse } from '@/core/http.response';
// import { Jwt } from '@/core/jwt';

export const personRoute = new Elysia({ prefix: '/person' })
  //   .onBeforeHandle(async ({ cookie: { auth_token }, set }) => {
  //     const token = auth_token.value;
  //     if (!token) {
  //       set.status = 401;
  //       return HttpResponse.unauthorized('Missing auth token');
  //     }

  //     const decoded = await Jwt.verify(token);
  //     if (!decoded) {
  //       set.status = 401;
  //       return HttpResponse.unauthorized('Invalid or expired token');
  //     }
  //   })
  .get('/', personController.gets.handler, personController.gets.Schema)
  .post('/', personController.create.handler, personController.create.Schema)
  .post(
    '/importAddress',
    personController.importAddressController.handler,
    personController.importAddressController.Schema
  )
  .post(
    '/med',
    personController.createMed.handler,
    personController.createMed.Schema
  )
  .post(
    '/guardian',
    personController.createGuardian.handler,
    personController.createGuardian.Schema
  );
