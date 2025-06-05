import { Elysia } from 'elysia';
import { personController } from '@/modules/register/controller/person.controller';

export const personRoute = new Elysia({ prefix: '/person' })
  .post('/registerPerson', personController.createPerson.handler, personController.createPerson.Schema)
  .get('/form-allRegister', personController.getFormAllRegister.handler, personController.getFormAllRegister.Schema)
  .get('/:pid', personController.getFormRegisterById.handler, personController.getFormRegisterById.Schema)
  .put('/', personController.editFormPerson.handler, personController.editFormPerson.Schema)
  .put('/guardian', personController.editFormGuardian.handler, personController.editFormGuardian.Schema)
  .put('/address', personController.editFormAddress.handler, personController.editFormAddress.Schema);
