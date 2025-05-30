import { Elysia } from 'elysia';
import { screeningController } from './controller/screening.controller';

export const screeningRoute = new Elysia({ prefix: '/screening' })
  .post(
    '/',
    screeningController.create.handler,
    screeningController.create.schema
  )
  .put(
    'forms/:form_id',
    screeningController.updateFormData.handler,
    screeningController.updateFormData.schema
  )
  .get(
    '/',
    screeningController.getScreeningList.handler,
    screeningController.getScreeningList.schema
  )
  .get(
    '/:visit_id',
    screeningController.getScreeningByID.handler,
    screeningController.getScreeningByID.schema
  )
  .put(
    '/visit/:visit_id',
    screeningController.updateVisitDate.handler,
    screeningController.updateVisitDate.schema
  );
