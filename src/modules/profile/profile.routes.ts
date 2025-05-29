import { Elysia } from 'elysia';
import { profileController } from './controller/profile.controller';

export const profileRoute = new Elysia({ prefix: '/profiles' }).get(
  '/',
  profileController.getUserProfile.handler,
  profileController.getUserProfile.schema
);
