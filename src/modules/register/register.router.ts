import { Elysia } from 'elysia';
import { personController } from '@/modules/register/controller/person.controller';

export const personRoute = new Elysia({ prefix: '/person' })
  .post(
    '/registerPerson',
    personController.createPerson.handler,
    personController.createPerson.Schema
  )
  .get(
    '/formRegister',
    personController.getFormRegister.handler,
    personController.getFormRegister.Schema
  );
