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
import { getFormPerson } from '../usecase/get-allRegister';
import { getPersonById } from '../usecase/get-register';

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
  getFormAllRegister: {
    Schema: {
      query: t.Object({
        search: t.Optional(t.String({ description: 'search name' })),
        page: t.Optional(t.Number({ default: 1 })),
        limit: t.Optional(t.Number({ default: 10 })),
      }),
      response: {
        201: t.Object({
          success: t.Boolean(),
          message: t.String(),
          pagination: t.Object({
            page: t.Number(),
            limit: t.Number(),
            totalItems: t.Number(),
            totalPages: t.Number(),
          }),
          data: t.Array(
            t.Object({
              pid: t.String(),
              hn: t.String(),
              title: t.String(),
              fullname: t.String(),
              // birth: t.Date(),
              phone: t.String(),
              consent: t.String(),
              age: t.String(),
            })
          ),
        }),
        500: HttpResponseSchema.error(),
      },
      summary: 'Form User Register',
      description: 'get list of user',
      tags: ['Register'],
    },
    handler: async ({ set, query }: Context) => {
      try {
        const searchName = query.search?.toLowerCase() ?? '';
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;

        const { data, totalItems } = await getFormPerson(
          searchName,
          page,
          limit
        );

        const personList = data.map((persons) => ({
          pid: persons.pid,
          hn: persons.hn,
          title: persons.title,
          fullname: `${persons.title} ${persons.first_name} ${persons.last_name}`,
          age: persons.age,
          phone: persons.phone,
          consent: persons.consent,
        }));
        // .filter((persons) =>
        //   persons.fullname.toLowerCase().includes(searchName)
        // );

        const totalPages = Math.ceil(totalItems / limit);

        set.status = 200;
        return {
          success: true,
          message: 'success',
          pagination: {
            page,
            limit,
            totalItems,
            totalPages,
          },
          data: personList,
        };
      } catch (err: unknown) {
        set.status = 500;
        return HttpResponse.error(
          err instanceof Error ? err.message : 'Unexpected error'
        );
      }
    },
  },
  getFormRegisterById: {
    Schema: {
      params: t.Object({
        pid: t.String({ format: 'uuid', description: 'PID from persons' }),
      }),
      response: {
        201: t.Object({
          success: t.Boolean(),
          message: t.String(),
          data: t.Array(
            t.Object({
              pid: t.String(),
            })
          ),
        }),
        500: HttpResponseSchema.error(),
      },
      summary: 'Get person by ID',
      description: 'Fetch a person using their unique UUID.',
      tags: ['Register'],
    },
    handler: async ({ params, set }: Context) => {
      try {
        const person = await getPersonById(params.pid);
        const personList = person.map((persons) => ({
          pid: persons.pid,
          hn: persons.hn,
          sex: persons.sex,
          idcard: persons.idcard,
          title: persons.title,
          fullname: `${persons.first_name} ${persons.last_name}`,
          first_nmae: persons.first_name,
          last_name: persons.last_name,
          dirth: persons.birth,
          age: persons.age,
          boot_type: persons.blood_type,
          phone: persons.phone,
          consent: persons.consent,
        }));
        set.status = 200;

        return {
          success: true,
          message: 'Fetched person successfully',
          data: personList,
        };
      } catch (err: unknown) {
        set.status = 500;
        return HttpResponse.error(
          err instanceof Error ? err.message : 'Unexpected error'
        );
      }
    },
  },
};
