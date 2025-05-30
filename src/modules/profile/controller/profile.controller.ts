import { HttpResponseSchema } from '@/core/http.response';
import { getUserProfile } from '../usecase/get-user-profile';
import { Context, t } from 'elysia';
import { UserProfile, VhvProfile } from '../model/profile.model';
import { Jwt } from '@/core/jwt';

export const profileController = {
  getUserProfile: {
    schema: {
      response: {
        201: t.Object({
          success: t.Boolean(),
          data: t.Union([UserProfile, VhvProfile]),
        }),
        401: HttpResponseSchema.unauthorized(),
        500: HttpResponseSchema.error(),
      },
      summary: 'Get user profile',
      description: 'Fetch user profile from auth token',
      tags: ['Profile'],
    },
    handler: async ({ set, cookie }: Context & {}) => {
      try {
        const token = cookie.auth_token.value;
        if (!token) {
          set.status = 401;
          return {
            success: false as const,
            message: 'Missing auth token',
          };
        }

        const decoded = await Jwt.verify(token || '');
        if (!decoded) {
          set.status = 401;
          return {
            success: false as const,
            message: 'Invalid or expired token',
          };
        }

        const profile = await getUserProfile(decoded);

        set.status = 201;
        return { success: true as const, data: profile };
      } catch (err: unknown) {
        set.status = 500;
        if (err instanceof Error) {
          return {
            success: false as const,
            message: 'Internal Server Error',
            detail: err.message,
          };
        }
        return {
          success: false as const,
          message: 'Internal Server Error',
          detail: 'Unexpected error',
        };
      }
    },
  },
};
