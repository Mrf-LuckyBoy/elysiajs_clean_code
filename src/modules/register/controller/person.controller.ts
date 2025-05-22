import { t, Context } from 'elysia';
import { createPerson } from '../personcase/create-person';
import { createMedical } from '../personcase/create-medical';
import { createGuardian } from '../personcase/create-guardian';
import { getPerson } from '../personcase/gets-person';
import { HttpResponse } from '@/core/http.response';
import { PersonRepository } from '../infra/person.repository';
import { RegisterFormSchema, RegisterFormDTO } from '../model/person.model';

export const personController = {
  create: {
    Schema: {
      body: RegisterFormSchema,
      response: t.Object({
        success: t.Boolean(),
        data: t.Object({
          pid: t.String(),
          med_id: t.String(),
          sex: t.String(),
          idcard: t.String(),
          title: t.String(),
          first_name: t.String(),
          last_name: t.String(),
          birth: t.Date(),
          phone: t.String(),
          boot_type: t.String(),
          consent: t.String(),
          status: t.String(),
          reason_cancel: t.String(),
          hcode: t.String(),
          guardian: t.String(),
          is_delect: t.String(),
          village: t.String(),
          created_at: t.String({ format: 'date-time' }),
          updated_at: t.String({ format: 'date-time' }),
        }),
      }),
      summary: 'Create new person',
      description: 'Creates a new person with the specified info.',
      tags: ['Person'],
    },
    handler: async ({
      body,
      set,
    }: Context & {
      body: RegisterFormDTO;
    }) => {
      try {
        // const person = await createPerson(
        //   body.med_id,
        //   body.sex,
        //   body.idcard,
        //   body.title,
        //   body.first_name,
        //   body.last_name,
        //   body.birth,
        //   body.phone,
        //   body.boot_type,
        //   body.consent,
        //   body.status,
        //   body.reason_cancel,
        //   body.hcode,
        //   body.guardian,
        //   body.is_delect,
        //   body.village
        // );

        return { success: true, data: person };
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
  gets: {
    Schema: {
      response: t.Object({
        success: t.Boolean(),
        data: t.Array(
          t.Object({
            pid: t.String(),
            first_name: t.String(),
          })
        ),
      }),
      summary: 'Get all person',
      description: 'Fetch all person.',
      tags: ['Person'],
    },
    handler: async () => {
      const person = await getPerson();
      return { success: true, data: person ?? [] };
    },
  },
  createMed: {
    Schema: {
      body: t.Object({
        chronic_disease: t.String({ description: 'Chronic disease history' }),
        allergy_history: t.String({ description: 'Allergy history' }),
        allergy_symptoms: t.String({ description: 'Allergy symptoms' }),
      }),
      response: t.Object({
        success: t.Boolean(),
        data: t.Object({
          med_id: t.String(),
          chronic_disease: t.String(),
          allergy_history: t.String(),
          allergy_symptoms: t.String(),
          created_at: t.String({ format: 'date-time' }),
          updated_at: t.String({ format: 'date-time' }),
        }),
      }),
      summary: 'Create new person',
      description: 'Creates a new person with the specified info.',
      tags: ['Person'],
    },
    handler: async ({
      body,
      set,
    }: Context & {
      body: {
        chronic_disease: string;
        allergy_history: string;
        allergy_symptoms: string;
      };
    }) => {
      try {
        const medical = await createMedical(
          body.chronic_disease,
          body.allergy_history,
          body.allergy_symptoms
        );

        return { success: true, data: medical };
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
  importAddressController: {
    Schema: {
      body: t.Array(
        t.Object({
          addresscode: t.String(),
          provcode: t.String(),
          provname: t.String(),
          distcode: t.String(),
          distname: t.String(),
          subdistcode: t.String(),
          subdistname: t.String(),
          area: t.String(),
          areacode: t.String(),
          zipcode: t.String(),
        })
      ),
      response: t.Object({
        success: t.Boolean(),
        inserted: t.Number(),
      }),
      summary: 'Import address codes from JSON',
      description: 'Import multiple address_code entries in bulk',
      tags: ['Address'],
    },
    handler: async ({ body, set }: Context & { body: any }) => {
      try {
        if (!Array.isArray(body)) {
          set.status = 400;
          return HttpResponse.error('Invalid format: expected JSON array');
        }

        await PersonRepository.insertManyAddressCodes(body);

        return {
          success: true,
          inserted: body.length,
        };
      } catch (err) {
        set.status = 500;
        return HttpResponse.error((err as Error).message);
      }
    },
  },
  createGuardian: {
    Schema: {
      body: t.Object({
        relationships: t.String({ description: 'Chronic disease history' }),
        idcard: t.String({ description: 'idard of the guardian' }),
        title: t.String({ description: 'title of the guardian' }),
        first_name: t.String({ description: 'first name of the guardian' }),
        last_name: t.String({ description: 'last name of the guardian' }),
        birth: t.String({ format: 'date', description: 'birth of the person' }),
        phone: t.String({ description: 'phone of the guardian' }),
        hcode: t.String({ description: 'hcode of the guardian' }),
      }),
      response: t.Object({
        success: t.Boolean(),
        data: t.Object({
          guardian_id: t.String(),
          relationships: t.String(),
          idcard: t.String(),
          title: t.String(),
          first_name: t.String(),
          last_name: t.String(),
          birth: t.Date(),
          phone: t.String(),
          hcode: t.String(),
          created_at: t.String({ format: 'date-time' }),
          updated_at: t.String({ format: 'date-time' }),
        }),
      }),
      summary: 'Create new guardian',
      description: 'Creates a new guardian with the specified info.',
      tags: ['Person'],
    },
    handler: async ({
      body,
      set,
    }: Context & {
      body: {
        guardian_id: string;
        idcard: string;
        relationships: string;
        title: string;
        first_name: string;
        last_name: string;
        birth: Date;
        phone: string;
        hcode: string;
      };
    }) => {
      try {
        const guardian = await createGuardian(
          body.guardian_id,
          body.relationships,
          body.idcard,
          body.title,
          body.first_name,
          body.last_name,
          body.birth,
          body.phone,
          body.hcode
        );

        return { success: true, data: guardian };
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
