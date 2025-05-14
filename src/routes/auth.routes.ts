import { Elysia } from 'elysia';

export const authRoute = new Elysia({ prefix: '/auth' }).get(
  '/user',
  () => ({ id: 1, name: 'Mock User' }),
  {
    detail: {
      summary: 'Get mock user',
      tags: ['Auth'],
      responses: {
        200: {
          description: 'A mock user object',
          content: {
            'application/json': {
              example: { id: 1, name: 'Mock User' },
            },
          },
        },
      },
    },
  }
);
