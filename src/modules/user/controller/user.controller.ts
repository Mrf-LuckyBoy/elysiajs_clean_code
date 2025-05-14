import { t } from 'elysia';
import { getUserById } from '../usecase/get-user';
import { createUser } from '../usecase/create-user';

export const userController = {
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
};
