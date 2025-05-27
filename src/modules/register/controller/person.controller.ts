import { Context, t } from 'elysia';
// import { getPerson } from '../usecase/gets-person';
import { RegisterPerson } from '../usecase/register-person';
import { HttpResponse, HttpResponseSchema } from '@/core/http.response';
import {
  // RegisterFormDTO,
  // RegisterFormSchema,
  NewRegisterFormDTO,
  NewRegisterFormSchema,
  PersonDTO,
} from '../model/person.model';
import { getFormPerson } from '../usecase/get-formRegister';

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
        console.log('error in handler ');
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
  getFormRegister: {
    Schema: {
      query: t.Object({
        search: t.String({ description: 'search name' }),
      }),
      response: {
        201: t.Object({
          success: t.Boolean(),
          message: t.String(),
          data: t.Array(
            t.Object({
              pid: t.String(),
              title: t.String(),
              fullname: t.String(),
              // birth: t.Date(),
              phone: t.String(),
              consent: t.String(),
              age: t.String(),
            })
          ),
        }),
        // 500: HttpResponseSchema.error(),
      },
      summary: 'user vhv dropdown',
      description: 'get list of user vhv',
      tags: ['Register'],
    },
    handler: async ({ set, query }: Context) => {
      try {
        const searchName = query.search?.toLowerCase() ?? '';
        // const person: PersonDTO[] = await getFormPerson();
        const person: PersonDTO[] = (await getFormPerson()) ?? [];
        const personList = person
          .map((person) => ({
            pid: person.pid,
            title: person.title,
            fullname: `${person.title} ${person.first_name} ${person.last_name}`,
            // birth: person.birth,
            age: person.age,
            phone: person.phone,
            consent: person.consent,
          }))
          .filter((person) =>
            person.fullname.toLowerCase().includes(searchName)
          );
        set.status = 200;
        return HttpResponse.success(personList);
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
