import { Context, t } from "elysia";
import { ScreeningRequestDTO, ScreeningResponseSchema, ScreeningSchema } from "../model/screening.model";
import { createScreening } from "../usecase/create-screening";
import { HttpResponse, HttpResponseSchema } from "@/core/http.response";

export const screeningController = {
    create: {
        schema: {
            body: ScreeningSchema,
             response: {
                200: t.Object({
                    success: t.Boolean(),
                    data: ScreeningResponseSchema,
                    message: t.String(),
                }),
                400: HttpResponseSchema.badRequest(),
                500: HttpResponseSchema.error(),
            },
            summary: 'Create new screening data',
            description: 'Creates a new screening record with the specified data.',
            tags: ['Screening'],
        },
        handler: async ({ body, set }: Context & { body: ScreeningRequestDTO }) => {
            try {
                 const screening = await createScreening(body);
                 set.status = 200
            return { 
                success: true, 
                data: screening,
                message: 'สร้างข้อมูลการคัดกรองเรียบร้อย'
            };
            } catch (err: unknown) {
                if (err instanceof Error) {
                    if (err.message === 'Please select an assignment option') {
                        set.status = 400;
                        return HttpResponse.badRequest('Please select an assignment option');
                    }
                    set.status = 500;
                    return HttpResponse.error(err.message);
                } else {
                    set.status = 500;
                    return HttpResponse.error('Unknown error occurred');
                }
            }
           
        }
    }
};