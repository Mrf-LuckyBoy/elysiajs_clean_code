import { Context, t } from 'elysia';
// import { getPerson } from '../usecase/gets-person';
import { RegisterPerson } from '../usecase/register-person';
import { HttpResponse, HttpResponseSchema } from '@/core/http.response';
import {
  // RegisterFormDTO,
  // RegisterFormSchema,
  NewRegisterFormDTO,
  NewRegisterFormSchema,
  EditPersonFormSchema,
  EditGuardianFormSchema,
  editPersonDTO,
  editGuardianDTO,
  FormAddressSchema,
  FormAddressDTO,
} from '../model/person.model';
import { getFormPerson } from '../usecase/get-allRegister';
import { getPersonById } from '../usecase/get-register';
import { editPerson } from '../usecase/edit-person';
import { editGuardian } from '../usecase/edit-guardian';
import { editAddress } from '../usecase/edit-address';

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
        if (
          body.address_cid.hno === '' ||
          body.address_cid.street === '' ||
          body.address_cid.moo === '' ||
          body.address_cid.villcode === ''
        ) {
          set.status = 400;
          return HttpResponse.badRequest('ไม่มีข้อมูลที่อยู่ตามบัตรประชาชน');
        } else if (
          body.type_card === false &&
          (body.address_current.hno === '' ||
            body.address_current.street === '' ||
            body.address_current.moo === '' ||
            body.address_current.villcode === '')
        ) {
          set.status = 400;
          return HttpResponse.badRequest(
            'ที่อยู่ปัจจุบันไม่เป็นที่อยู่เดียวกับที่อยู่ตามบัตรประชาชนแต่ไม่กรอกข้อมูลที่อยูปัจจุบัน'
          );
        }
        if (
          body.guardian.relationships === '' ||
          body.guardian.idcard === '' ||
          body.guardian.title === '' ||
          body.guardian.first_name === '' ||
          body.guardian.last_name === '' ||
          body.guardian.phone === ''
        ) {
          set.status = 400;
          return HttpResponse.badRequest('กรุณากรอกข้อมูลผู้ดูแล');
        } else if (
          body.type_guardian === false &&
          (body.guardian.hno === '' ||
            body.guardian.street === '' ||
            body.guardian.moo === '' ||
            body.guardian.villcode === '')
        ) {
          set.status = 400;
          return HttpResponse.badRequest(
            'ที่อยู่ผู้ดูแลไม่เป็นที่อยู่เดียวกับที่อยู่ตามที่อยู่ปัจจุบันของผู้ได้รับการดูแลแต่ไม่กรอกข้อมูลที่อยู่ผู้ดูแล'
          );
        }

        const result: NewRegisterFormDTO = await RegisterPerson(body);

        set.status = 201;
        return HttpResponse.success(result);
      } catch (err: unknown) {
        console.error(err);
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
              // idcard: t.String(),
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
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;

        const { data, totalItems } = await getFormPerson(searchName, page, limit);

        const personList = data.map((persons) => ({
          pid: persons.pid,
          hn: persons.hn,
          title: persons.title,
          fullname: `${persons.title} ${persons.first_name} ${persons.last_name}`,
          age: persons.age,
          phone: persons.phone,
          consent: persons.consent,
        }));
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
        return HttpResponse.error(err instanceof Error ? err.message : 'Unexpected error');
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
          first_name: persons.first_name,
          last_name: persons.last_name,
          birth: persons.birth,
          age: persons.age,
          blood_type: persons.blood_type,
          phone: persons.phone,
          consent: persons.consent,
          inscl_code: persons.inscl_code,
          email: persons.email,
          medical_history: {
            chronic_disease: persons.medical_history?.chronic_disease,
            allergy_history: persons.medical_history?.allergy_history,
            allergy_symptoms: persons.medical_history?.allergy_symptoms,
          },
          address: {
            hcode: {
              fullAddress: persons.address?.fullAddress,
              street: persons.address?.street,
              moo: persons.address?.moo,
              subdistname: persons.address_code?.subdistname,
              distname: persons.address_code?.distname,
              provname: persons.address_code?.provname,
            },
            hcode_cid: {
              fullAddress: persons.address?.fullAddress,
              street: persons.address?.street,
              moo: persons.address?.moo,
              subdistname: persons.address_code?.subdistname,
              distname: persons.address_code?.distname,
              provname: persons.address_code?.provname,
            },
          },
          guardians: persons.guardians
            ? {
                guardian_id: persons.guardians.guardian_id,
                relationships: persons.guardians.relationships,
                idcard: persons.guardians.idcard,
                title: persons.guardians.title,
                first_name: persons.guardians.first_name,
                last_name: persons.guardians.last_name,
                birth: persons.guardians.birth,
                age: persons.guardians.age,
                phone: persons.guardians.phone,
                hcode: persons.guardians.hcode,
                fullAddress: persons.guardians.fullAddress,
                street: persons.address?.street,
                moo: persons.address?.moo,
                subdistname: persons.address_code?.subdistname,
                distname: persons.address_code?.distname,
                provname: persons.address_code?.provname,
              }
            : '',
        }));

        set.status = 200;
        return {
          success: true,
          message: 'Fetched person successfully',
          data: personList,
        };
      } catch (err: unknown) {
        set.status = 500;
        return HttpResponse.error(err instanceof Error ? err.message : 'Unexpected error');
      }
    },
  },
  editFormPerson: {
    Schema: {
      body: EditPersonFormSchema,
      response: {
        201: t.Object({
          success: t.Boolean(),
          message: t.String(),
          data: EditPersonFormSchema,
        }),
        400: HttpResponseSchema.badRequest(),
        500: HttpResponseSchema.error(),
      },
      summary: 'to update person',
      description: 'Update a person with person id.',
      tags: ['Register'],
    },
    handler: async ({ body, set }: Context & { body: editPersonDTO }) => {
      try {
        const person = await editPerson(body);
        set.status = 201;
        return HttpResponse.success(person);
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
  editFormGuardian: {
    Schema: {
      body: EditGuardianFormSchema,
      response: {
        201: t.Object({
          success: t.Boolean(),
          message: t.String(),
          data: EditGuardianFormSchema,
        }),
        400: HttpResponseSchema.badRequest(),
        500: HttpResponseSchema.error(),
      },
      summary: 'to update guardian',
      description: 'Update a guardian with guardian id.',
      tags: ['Register'],
    },
    handler: async ({ body, set }: Context & { body: editGuardianDTO }) => {
      try {
        const person = await editGuardian(body);
        set.status = 201;
        return HttpResponse.success(person);
      } catch (err: unknown) {
        console.log(err);
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
  editFormAddress: {
    Schema: {
      body: FormAddressSchema,
      response: {
        201: t.Object({
          success: t.Boolean(),
          message: t.String(),
          data: FormAddressSchema,
        }),
        400: HttpResponseSchema.badRequest(),
        500: HttpResponseSchema.error(),
      },
      summary: 'to update address',
      description: 'Update a address with address id.',
      tags: ['Register'],
    },
    handler: async ({ body, set }: Context & { body: FormAddressDTO }) => {
      try {
        const address = await editAddress(body);
        set.status = 201;
        return HttpResponse.success(address);
      } catch (err: unknown) {
        console.log(err);
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
