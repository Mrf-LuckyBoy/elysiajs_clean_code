import { t } from 'elysia';
import { getUserById } from '../usecase/get-user';
import { createUser } from '../usecase/create-user';
import { getUsers } from '../usecase/gets-user';
import { updateUser } from '../usecase/update-user';
import { deleteUser } from '../usecase/delete-user';

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
