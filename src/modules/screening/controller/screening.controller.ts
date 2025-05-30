import { Context, t } from 'elysia';
import {
  PaginationQuery,
  PaginationSchema,
  CreateScreeningRequestDTO,
  ScreeningSchema,
  UpdateScreeningFormDTO,
  UpdateScreeningFormSchema,
  UpdateVisitDateRequestDTO,
  UpdateVisitDateRequestSchema,
  DecodedToken,
  ScreeningListResponseSchema,
  GetScreeningByVisitIDSchema,
} from '../model/screening.model';
import { createScreening } from '../usecase/create-screening';
import { HttpResponse, HttpResponseSchema } from '@/core/http.response';
import { updateScreeningFormData } from '../usecase/update-screening-form';
import { getScreeningList } from '../usecase/get-screening-list';
import { getScreeningByVisitID } from '../usecase/get-screening-by-id';
import { updateVisitDate } from '../usecase/update-visit-date';
import { Jwt } from '@/core/jwt';

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
        500: HttpResponseSchema.error(),
      },
      summary: 'Update screening data',
      description: 'Update screening record with the specified data.',
      tags: ['Screening'],
    },
    handler: async ({
      params,
      body,
      set,
    }: Context & {
      params: { form_id: string };
      body: UpdateScreeningFormDTO;
    }) => {
      try {
        const formID = params.form_id;
        await updateScreeningFormData(formID, body);
        set.status = 201;
        return {
          success: true,
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
          }),
          message: t.String(),
        }),
        401: HttpResponseSchema.unauthorized(),
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
  getScreeningByID: {
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
        500: HttpResponseSchema.error(),
      },
      summary: 'Get screening by visit id',
      description: 'Fetch screening records by visit id.',
      tags: ['Screening'],
    },
    handler: async ({
      params,
      set,
    }: Context & {
      params: { visit_id: string };
    }) => {
      try {
        const visitID = params.visit_id;
        if (!visitID) {
          set.status = 400;
          return HttpResponse.badRequest('Visit ID is required');
        }

        const screeningData = await getScreeningByVisitID(visitID);
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
      Params: t.Object({
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
