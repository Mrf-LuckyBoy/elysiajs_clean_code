import { Elysia } from 'elysia';
import { dropdownController } from './controller/dropdown.controller';

export const dropdownRoute = new Elysia({ prefix: '/dropdown' })
  .get(
    '/titleName',
    dropdownController.dropDownTitle.handler,
    dropdownController.dropDownTitle.Schema
  )
  .get(
    '/address',
    dropdownController.dropdownAddress.handler,
    dropdownController.dropdownAddress.Schema
  )
  .get(
    '/relationship',
    dropdownController.dropdownRelationship.handler,
    dropdownController.dropdownRelationship.Schema
  );
