import { t, Context } from 'elysia';
import { loginProviderID } from '../usecase/login-providerID';
import { loginSetToken } from '../usecase/login-setToken';
import { HttpResponse, HttpResponseSchema } from '@/core/http.response';
import { UserProviderSchema } from '../model/auth.model';
import { ENV } from '@/config/env';

export const authController = {
  loginProviderID: {
    Schema: {
      body: t.Object({
        code: t.String(),
      }),
      response: {
        201: t.Object({
          success: t.Boolean(),
          message: t.String(),
          data: t.Array(UserProviderSchema),
        }),
        400: HttpResponseSchema.badRequest(),
        500: HttpResponseSchema.error(),
      },
      summary: 'Login Provider',
      description: 'get list of useable',
      tags: ['Auth'],
    },
    handler: async ({ body, set }: Context & { body: { code: string } }) => {
      try {
        const useable = await loginProviderID(body.code);
        if (!useable || useable.length === 0) {
          set.status = 400;
          return HttpResponse.badRequest('ไม่มีหน่วยบริการที่สามารถใช้งานได้');
        }
        set.status = 201;
        return HttpResponse.success(useable);
      } catch (err: unknown) {
        if (err instanceof Error) {
          set.status = 500;
          return HttpResponse.error(err.message);
        } else {
          set.status = 500;
          return HttpResponse.error('Unexpected error');
        }
      }
    },
  },

  loginSetCookie: {
    Schema: {
      body: t.Object({
        cid_hash: t.String(),
        hos_code: t.String(),
        position: t.String(),
      }),
      response: {
        201: t.Object({
          success: t.Boolean(),
          message: t.String(),
          data: t.String(),
        }),
        400: HttpResponseSchema.badRequest(),
        500: HttpResponseSchema.error(),
      },
      summary: 'Login Provider',
      description: 'Set cookie after login',
      tags: ['Auth'],
    },
    handler: async ({
      body,
      set,
      cookie: { auth_token },
    }: Context & {
      body: { cid_hash: string; hos_code: string; position: string };
    }) => {
      try {
        const token = await loginSetToken(body);
        if (token === '') {
          set.status = 400;
          return HttpResponse.badRequest('not found user');
        }
        auth_token.set({
          ...(ENV.BUN_ENV !== 'development' && {
            domain: 'uat-parentcare.one.th',
          }),
          httpOnly: true,
          sameSite: 'lax',
        });
        auth_token.value = token;
        set.status = 201;
        return HttpResponse.success(token);
      } catch (err: unknown) {
        if (err instanceof Error) {
          set.status = 500;
          return HttpResponse.error(err.message);
        } else {
          set.status = 500;
          return HttpResponse.error('Unexpected error');
        }
      }
    },
  },
};
