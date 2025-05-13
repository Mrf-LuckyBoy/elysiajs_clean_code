import { t } from 'elysia';
import { getUserById } from '../usecase/get-user';
import { createUser } from '../usecase/create-user';

export const userController = {
  getById: {
    schema: {
      params: t.Object({
        id: t.String({ format: 'uuid' }),
      }),
    },
    handler: async ({ params }: { params: { id: string } }) => {
      const user = await getUserById(params.id);
      return { success: true, data: user };
    },
  },
  create: {
    schema: {
      body: t.Object({
        name: t.String(),
      }),
    },
    handler: async ({ body }: { body: { name: string } }) => {
      const user = await createUser(body.name);
      return { success: true, data: user };
    },
  },
};
