import { HttpResponse } from "@/core/http.response";
import { Jwt } from "@/core/jwt";
import { Elysia } from "elysia";
import { screeningController } from "./controller/screening.controller";

export const screeningRoute = new Elysia({ prefix: '/screening' })
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

  .post('/', screeningController.create.handler, screeningController.create.schema)