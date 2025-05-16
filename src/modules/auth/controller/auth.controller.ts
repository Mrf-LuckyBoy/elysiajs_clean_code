import { t, Context } from 'elysia';
import { loginProviderID } from '../usecase/login-providerID';
import { HttpResponse } from '@/core/http.response';
import { UserProviderSchema } from '../model/auth.model';

export const authController = {
  loginProviderID: {
    Schema: {
      body: t.Object({
        code: t.String(),
      }),
      response: {
        200: t.Object({
          success: t.Boolean(),
          message: t.String(),
          data: t.Array(UserProviderSchema),
        }),
        400: t.Object({
          success: t.Boolean(),
          message: t.String(),
          detail: t.String(),
        }),
      },
      summary: 'Login Provider',
      description: 'get list of useable',
      tags: ['Auth'],
    },
    handler: async ({ body, set }: Context & { body: { code: string } }) => {
      const useable = await loginProviderID(body.code);
      if (!useable || useable.length === 0) {
        set.status = 400;
        return HttpResponse.badRequest('ไม่มีหน่วยบริการที่สามารใช้งานได้');
      }
      return HttpResponse.success(useable);
    },
  },
};
