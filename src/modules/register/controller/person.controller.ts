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
};
