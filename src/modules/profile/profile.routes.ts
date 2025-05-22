import { Elysia } from 'elysia';
import { profileController } from "./controller/profile.controller";
import { Jwt } from "@/core/jwt";
import { HttpResponse } from "@/core/http.response";

export const profileRoute = new Elysia({ prefix: '/profiles' })
    .onBeforeHandle(async ({ cookie: { auth_token }, set }) => {
        const token = auth_token.value;
        if (!token) {
            set.status = 401;
            return HttpResponse.unauthorized('Missing auth token');
        }

    const decoded = await Jwt.verify(token);
    if (!decoded) {
      set.status = 401;
      return HttpResponse.unauthorized('Invalid or expired token');
    }
  })

  .get('/', profileController.getUserProfile.handler, profileController.getUserProfile.schema)
