import { t } from "elysia";
import { GetScreeningByVisitIDSchema, PaginationQuery, PaginationSchema, ScreeningListResponseSchema, ScreeningRequestDTO, ScreeningResponseSchema, ScreeningSchema, UpdateScreeningFormDTO, UpdateScreeningFormSchema } from "../model/screening.model";
import { createScreening } from "../usecase/create-screening";
import { HttpResponse, HttpResponseSchema } from "@/core/http.response";
import { updateScreeningFormData } from "../usecase/update-screening-form";
import { getScreeningList } from "../usecase/get-screening-list";
import { getScreeningByVisitID } from "../usecase/get-screening-by-id";

export const screeningController = {
    create: {
        schema: {
            body: ScreeningSchema,
             response: {
                200: t.Object({
                    success: t.Boolean(),
                    message: t.String(),
                }),
                400: HttpResponseSchema.badRequest(),
                500: HttpResponseSchema.error(),
            },
            summary: 'Create new screening data',
            description: 'Creates a new screening record with the specified data.',
            tags: ['Screening'],
        },
        handler: async ({ body, set }: { body: ScreeningRequestDTO; set: any }) => {
            try {
                 const screening = await createScreening(body);
                 set.status = 200
            return { 
                success: true, 
                message: 'Success'
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
           
        }
    },
    updateFormData: {
        schema: {
            Params: t.Object({
                form_id: t.String({ format: 'uuid', description: 'Screening Form ID' }),
            }),
            body: UpdateScreeningFormSchema,
             response: {
                200: t.Object({
                    success: t.Boolean(),
                    message: t.String(),
                }),
                400: HttpResponseSchema.badRequest(),
                500: HttpResponseSchema.error(),
            },
            summary: 'Update screening data',
            description: 'Update screening record with the specified data.',
            tags: ['Screening'],
        },
        handler: async ({ 
            params, 
            body, 
            set }: { 
                params: {form_id: string}; 
                body: UpdateScreeningFormDTO; 
                set: any }) => {
            try {
                const formID = params.form_id
                await updateScreeningFormData(formID, body);
                set.status = 200
            return { 
                success: true, 
                message: 'Success'
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
           
        }
    },
    getScreeningList: {
        schema: {
            query: PaginationSchema,
            response: {
                200: t.Object({
                    success: t.Boolean(),
                    data: t.Array(ScreeningListResponseSchema),
                    pagination: t.Object({
                        total: t.Number(),
                        page: t.Number(),
                        limit: t.Number(),
                    }),
                    message: t.String(),
                }),
                400: t.Object({
                    success: t.Boolean(),
                    message: t.String(),
                    detail: t.String(),
                }),
                500: t.Object({
                    success: t.Boolean(),
                    message: t.String(),
                    detail: t.String(),
                }),
            },
            summary: 'Get screening list',
            description: 'Fetch all screening records.',
            tags: ['Screening'],
                 },
        handler: async ({ query, set }: { query: PaginationQuery; set: any }) => {
            try {
                const screeningList = await getScreeningList(query);
                 set.status = 200
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
           
        }
    },
    getScreeningByID: {
        schema: {
            Params: t.Object({
                visit_id: t.String({ format: 'uuid', description: 'Visit ID' }),
            }),
            response: {
                200: t.Object({
                    success: t.Boolean(),
                    data: GetScreeningByVisitIDSchema,
                    message: t.String(),
                }),
                400: t.Object({
                    success: t.Boolean(),
                    message: t.String(),
                    detail: t.String(),
                }),
                500: t.Object({
                    success: t.Boolean(),
                    message: t.String(),
                    detail: t.String(),
                }),
            },
            summary: 'Get screening by visit id',
            description: 'Fetch screening records by visit id.',
            tags: ['Screening'],
        },
        handler: async ({ params, set }: { params: {visit_id: string}; set: any }) => {
                try {
                    const visitID = params.visit_id
                    if (!visitID) {
                        set.status = 400;
                        return HttpResponse.badRequest('Visit ID is required');
                    }
                    
                    const screeningData = await getScreeningByVisitID(visitID);
                     set.status = 200
                return {
                    success: true,
                    data: screeningData,
                    message: 'Screening retrieved successfully'
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
        }
    };