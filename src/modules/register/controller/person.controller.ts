import { Context, t } from 'elysia';
// import { getPerson } from '../usecase/gets-person';
import { RegisterPerson } from '../usecase/register-person';
import { HttpResponse, HttpResponseSchema } from '@/core/http.response';
import {
  // RegisterFormDTO,
  // RegisterFormSchema,
  NewRegisterFormDTO,
  NewRegisterFormSchema,
} from '../model/person.model';

export const personController = {
  createPerson: {
    Schema: {
      body: NewRegisterFormSchema,
      response: {
        201: t.Object({
          success: t.Boolean(),
          message: t.String(),
          data: NewRegisterFormSchema,
        }),
        400: HttpResponseSchema.badRequest(),
        500: HttpResponseSchema.error(),
      },
      summary: 'registerPerson',
      description: 'add person',
      tags: ['Register'],
    },
    handler: async ({ body, set }: Context & { body: NewRegisterFormDTO }) => {
      try {
        if (
          body.sex === '' ||
          body.idcard === '' ||
          body.title === '' ||
          body.first_name === '' ||
          body.last_name === '' ||
          body.blood_type === '' ||
          body.phone === '' ||
          body.chronic_disease === '' ||
          body.allergy_history === '' ||
          body.allergy_symptoms === ''
        ) {
          set.status = 400;
          return HttpResponse.badRequest('กรอกข้อมูลในหน้าแรกไม่ครบ');
        }
        const result: NewRegisterFormDTO = await RegisterPerson(body);

        set.status = 201;
        return HttpResponse.success(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          set.status = 500;
          return HttpResponse.error('some error detail');
        } else {
          set.status = 500;
          return HttpResponse.error('Unexpected error');
        }
      }
    },
  },
};
