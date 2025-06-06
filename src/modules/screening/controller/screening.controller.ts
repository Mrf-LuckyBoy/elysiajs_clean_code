import { Context, t } from 'elysia';
import {
  PaginationQuery,
  PaginationSchema,
  CreateScreeningRequestDTO,
  ScreeningSchema,
  UpdateScreeningFormSchema,
  UpdateVisitDateRequestDTO,
  UpdateVisitDateRequestSchema,
  DecodedToken,
  ScreeningListResponseSchema,
  GetScreeningByVisitIDSchema,
  SocialSectionSchema,
  ElderlySectionSchema,
  MiniCogSchema,
  GetFormDetailsQuerySchema,
  PersonalDetailsSchema,
  // GetScreeningFormDetailsSchema,
  GetFormDetailsQuery,
  mockupDataSchema,
  UpdateScreeningFormRequestDTO,
} from '../model/screening.model';
import { createScreening } from '../usecase/create-screening';
import { HttpResponse, HttpResponseSchema } from '@/core/http.response';
import { updateScreeningFormData, uploadToMinIOImage } from '../usecase/update-screening-form';
import { getScreeningList } from '../usecase/get-screening-list';
import { getScreeningByVisitID } from '../usecase/get-screening-by-id';
import { updateVisitDate } from '../usecase/update-visit-date';
import { Jwt } from '@/core/jwt';
import { getScreeningFormDetails } from '../usecase/get-screening-form-detials';

export const screeningController = {
  create: {
    schema: {
      body: ScreeningSchema,
      response: {
        201: t.Object({
          success: t.Boolean(),
          message: t.String(),
        }),
        400: HttpResponseSchema.badRequest(),
        401: HttpResponseSchema.unauthorized(),
        500: HttpResponseSchema.error(),
      },
      summary: 'Create new screening data',
      description: 'Creates a new screening record with the specified data.',
      tags: ['Screening'],
    },
    handler: async ({
      body,
      set,
      cookie: { auth_token },
    }: Context & {
      body: CreateScreeningRequestDTO;
    }) => {
      try {
        const token = auth_token.value;

        const decoded = (await Jwt.verify(token || '')) as DecodedToken;
        if (!decoded) {
          set.status = 401;
          return HttpResponse.unauthorized('Invalid or expired token');
        }

        await createScreening(body, decoded);
        set.status = 201;
        return {
          success: true,
          message: 'Success',
        };
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.message === 'Please select an assignment option') {
            set.status = 400;
            return HttpResponse.badRequest(err.message);
          }
          set.status = 500;
          return HttpResponse.error(err.message);
        } else {
          set.status = 500;
          return HttpResponse.error('Unexpected error');
        }
      }
    },
  },
  getFormDetailsByFormID: {
    schema: {
      params: t.Object({
        form_id: t.String({ format: 'uuid', description: 'Screening Form ID' }),
      }),
      query: GetFormDetailsQuerySchema,
      response: {
        201: t.Object({
          success: t.Boolean(),
          data: t.Union([
            // GetScreeningFormDetailsSchema,
            PersonalDetailsSchema,
            SocialSectionSchema,
            ElderlySectionSchema,
            MiniCogSchema,
            mockupDataSchema,
          ]),
          message: t.String(),
        }),
        500: HttpResponseSchema.error(),
        400: HttpResponseSchema.badRequest(),
        404: HttpResponseSchema.notFound(),
      },
      summary: 'Get screening data by screening form id',
      description: 'Get screening data by screening form id',
      tags: ['Screening'],
    },
    handler: async ({
      params,
      query,
      set,
    }: Context & {
      params: { form_id: string };
      query: GetFormDetailsQuery;
    }) => {
      try {
        const formID = params.form_id;

        if (!formID) {
          set.status = 400;
          return HttpResponse.badRequest('Form ID is required');
        }

        const formData = await getScreeningFormDetails(formID, query);
        if (!formData) {
          set.status = 404;
          return HttpResponse.notFound();
        }
        set.status = 201;
        return {
          success: true,
          data: formData,
          message: 'Success',
        };
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
  updateFormData: {
    schema: {
      params: t.Object({
        form_id: t.String({ format: 'uuid', description: 'Screening Form ID' }),
      }),
      body: UpdateScreeningFormSchema,
      response: {
        201: t.Object({
          success: t.Boolean(),
          message: t.String(),
        }),
        400: HttpResponseSchema.badRequest(),
        500: HttpResponseSchema.error(),
      },
      summary: 'Update screening data',
      description: 'Update screening record with the specified data.',
      tags: ['Screening'],
      type: 'multipart/form-data',
    },
    handler: async ({
      params,
      body,
      set,
    }: Context & {
      params: { form_id: string };
      body: UpdateScreeningFormRequestDTO;
    }) => {
      try {
        const formatBody = {
          ...body,
          is_alone: parseBoolean(body.is_alone),
          social_1: parseBoolean(body.social_1),
          social_2: parseBoolean(body.social_2),
          social_3: parseBoolean(body.social_3),
          elderly_1_1: parseBoolean(body.elderly_1_1),
          elderly_1_2: parseBoolean(body.elderly_1_2),
          elderly_2_1: parseBoolean(body.elderly_2_1),
          elderly_2_2: parseBoolean(body.elderly_2_2),
          elderly_3: parseBoolean(body.elderly_3),
          elderly_4: parseBoolean(body.elderly_4),
          elderly_5_1: parseBoolean(body.elderly_5_1),
          elderly_5_2: parseBoolean(body.elderly_5_2),
          elderly_6: parseBoolean(body.elderly_6),
          elderly_7: parseBoolean(body.elderly_7),
          elderly_8_1: parseBoolean(body.elderly_8_1),
          elderly_8_2: parseBoolean(body.elderly_8_2),
          elderly_9: parseBoolean(body.elderly_9),
          word_recall: parseNumber(body.word_recall),
          clock_draw: parseNumber(body.clock_draw),
          sum_mini_cog: parseNumber(body.sum_mini_cog),
        };

        const imageID = await uploadToMinIOImage(formatBody.image_file);
        const formID = params.form_id;
        await updateScreeningFormData(formID, formatBody, imageID);
        set.status = 201;
        return {
          success: true,
          message: 'Success',
        };
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.message.includes('Invalid image file')) {
            set.status = 400;
            return HttpResponse.badRequest(`"ประเภทไฟล์ไม่ถูกต้อง"`);
          }
          set.status = 500;
          return HttpResponse.error(err.message);
        } else {
          set.status = 500;
          return HttpResponse.error('Unexpected error');
        }
      }
      function parseBoolean(value: boolean | string | undefined | null): boolean | undefined {
        if (value === undefined || value === null) return undefined;
        if (typeof value === 'boolean') return value;
        if (typeof value === 'string') {
          return value.toLowerCase() === 'true';
        }
        return undefined;
      }

      function parseNumber(value: number | string | undefined | null): number | undefined {
        if (value === undefined || value === null) return undefined;
        if (typeof value === 'number') return value;
        if (typeof value === 'string') {
          const parsed = parseFloat(value);
          return isNaN(parsed) ? undefined : parsed;
        }
        return undefined;
      }
    },
  },
  getScreeningList: {
    schema: {
      query: PaginationSchema,
      response: {
        201: t.Object({
          success: t.Boolean(),
          data: t.Array(ScreeningListResponseSchema),
          pagination: t.Object({
            total: t.Number(),
            page: t.Number(),
            limit: t.Number(),
            statusCounts: t.Optional(
              t.Object({
                waiting: t.Number(),
                draft: t.Number(),
                completed: t.Number(),
              })
            ),
          }),
          message: t.String(),
        }),
        401: HttpResponseSchema.unauthorized(),
        404: HttpResponseSchema.notFound(),
        500: HttpResponseSchema.error(),
      },
      summary: 'Get screening list',
      description: 'Fetch all screening records.',
      tags: ['Screening'],
    },
    handler: async ({
      query,
      set,
      cookie: { auth_token },
    }: Context & {
      query: PaginationQuery;
    }) => {
      try {
        const token = auth_token.value;

        const decoded = (await Jwt.verify(token || '')) as DecodedToken;
        if (!decoded) {
          set.status = 401;
          return HttpResponse.unauthorized('Invalid or expired token');
        }
        const screeningList = await getScreeningList(query, decoded);
        if (!screeningList) {
          set.status = 404;
          return HttpResponse.notFound();
        }
        set.status = 201;
        return screeningList;
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
  getScreeningByVisitID: {
    schema: {
      params: t.Object({
        visit_id: t.String({ format: 'uuid', description: 'Visit ID' }),
      }),
      response: {
        201: t.Object({
          success: t.Boolean(),
          data: GetScreeningByVisitIDSchema,
          message: t.String(),
        }),
        400: HttpResponseSchema.badRequest(),
        401: HttpResponseSchema.unauthorized(),
        404: HttpResponseSchema.notFound(),
        500: HttpResponseSchema.error(),
      },
      summary: 'Get screening by visit id',
      description: 'Fetch screening records by visit id.',
      tags: ['Screening'],
    },
    handler: async ({
      params,
      set,
      cookie: { auth_token },
    }: Context & {
      params: { visit_id: string };
    }) => {
      try {
        const token = auth_token.value;

        const decoded = (await Jwt.verify(token || '')) as DecodedToken;
        if (!decoded) {
          set.status = 401;
          return HttpResponse.unauthorized('Invalid or expired token');
        }
        const visitID = params.visit_id;
        if (!visitID) {
          set.status = 400;
          return HttpResponse.badRequest('Visit ID is required');
        }

        const screeningData = await getScreeningByVisitID(visitID, decoded);
        if (!screeningData) {
          set.status = 404;
          return HttpResponse.notFound();
        }
        set.status = 201;
        return {
          success: true,
          data: screeningData,
          message: 'Screening retrieved successfully',
        };
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
  updateVisitDate: {
    schema: {
      params: t.Object({
        visit_id: t.String({ format: 'uuid', description: 'Visit ID' }),
      }),
      body: UpdateVisitDateRequestSchema,
      response: {
        201: t.Object({
          success: t.Boolean(),
          message: t.String(),
        }),
        400: HttpResponseSchema.badRequest(),
        500: HttpResponseSchema.error(),
      },
      summary: 'Update visit date',
      description: 'Update visit date.',
      tags: ['Screening'],
    },
    handler: async ({
      params,
      set,
      body,
    }: Context & {
      params: { visit_id: string };
      body: UpdateVisitDateRequestDTO;
    }) => {
      try {
        const visitID = params.visit_id;
        if (!visitID) {
          set.status = 400;
          return HttpResponse.badRequest('Visit ID is required');
        }
        await updateVisitDate(visitID, body);
        set.status = 201;
        return {
          success: true,
          message: 'Visit date updated successfully',
          data: null,
        };
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
