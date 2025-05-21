import { Context, t } from 'elysia';
import { getUserById } from '../usecase/get-user';
import { createUser } from '../usecase/create-user';
import { getUsers } from '../usecase/gets-user';
import { updateUser } from '../usecase/update-user';
import { deleteUser } from '../usecase/delete-user';
import { HttpResponse } from '@/core/http.response';
import { Jwt } from '@/core/jwt';
import { getUserProfile } from '../usecase/get-user-profile';
import { UserProfile, VhvProfile } from '../model/user.model';

export const userController = {
  gets: {
    Schema: {
      response: t.Object({
        success: t.Boolean(),
        data: t.Array(
          t.Object({
            id: t.String(),
            name: t.String(),
          })
        ),
      }),
      summary: 'Get all user',
      description: 'Fetch all user.',
      tags: ['User'],
    },
    handler: async () => {
      const user = await getUsers();
      return { success: true, data: user ?? [] };
    },
  },
  getById: {
    schema: {
      params: t.Object({
        id: t.String({ format: 'uuid', description: 'User UUID' }),
      }),
      response: t.Object({
        success: t.Boolean(),
        data: t.Object({
          id: t.String(),
          name: t.String(),
        }),
      }),
      summary: 'Get user by ID',
      description: 'Fetch a user using their unique UUID.',
      tags: ['User'],
    },
    handler: async ({ params }: { params: { id: string } }) => {
      const user = await getUserById(params.id);
      return { success: true, data: user };
    },
  },
  getUserProfile: {
    schema: {
response: {
   200: t.Union([
        t.Object({
          success: t.Boolean(),
          data: UserProfile,
        }),
        // VHV user response
        t.Object({
          success: t.Boolean(),
          data: VhvProfile,
        })
      ]),
        401: t.Object({
          success: t.Boolean(),
          message: t.String()
        }),
        500: t.Object({
          success: t.Boolean(),
          message: t.String()
        }),
      },
      summary: 'Get user profile',
      description: 'Fetch user profile from auth token',
      tags: ['User'],
    },
    handler: async ({ set, cookie: { auth_token } }: Context) => {
      try {
        const token = auth_token.value
        if (!token) {
          set.status = 401;
          return HttpResponse.unauthorized('Missing auth token');
        }

        const decoded = await Jwt.verify(token || '')
        if (!decoded) {
          set.status = 401
          return HttpResponse.unauthorized('Invalid or expired token')
        }

        const profile = await getUserProfile(decoded)
        
        set.status = 200                
        return { success: true, data: profile  }

      } catch (err: unknown) {        
        set.status = 500
        if (err instanceof Error) {
          return HttpResponse.error(err.message)
        }
        return HttpResponse.error('Unexpected error')
      }
    }
},
  create: {
    schema: {
      body: t.Object({
        name: t.String({ description: 'Full name of the user' }),
      }),
      response: t.Object({
        success: t.Boolean(),
        data: t.Object({
          id: t.String(),
          name: t.String(),
        }),
      }),
      summary: 'Create new user',
      description: 'Creates a new user with the specified name.',
      tags: ['User'],
    },
    handler: async ({ body }: { body: { name: string } }) => {
      const user = await createUser(body.name);
      return { success: true, data: user };
    },
  },
  update: {
    schema: {
      body: t.Object({
        id: t.String({ description: 'User id to update' }),
        name: t.String({ description: 'Full name of the user' }),
      }),
      response: t.Object({
        success: t.Boolean(),
        data: t.Object({
          id: t.String(),
          name: t.String(),
        }),
      }),
      summary: 'to update user',
      description: 'Update a user with user id.',
      tags: ['User'],
    },
    handler: async ({ body }: { body: { name: string; id: string } }) => {
      const user = await updateUser(body);
      return { success: true, data: user };
    },
  },
  delete: {
    schema: {
      params: t.Object({
        id: t.String({ format: 'uuid', description: 'User UUID' }),
      }),
      response: t.Object({
        success: t.Boolean(),
        message: t.String(),
      }),
      summary: 'Delete user by ID',
      description: 'Delete a user using their unique UUID.',
      tags: ['User'],
    },
    handler: async ({ params }: { params: { id: string } }) => {
      const result = await deleteUser(params.id);
      if (result === false)
        return { success: false, message: 'not found user' };
      return { success: true, message: 'delete success' };
    },
  },
};
