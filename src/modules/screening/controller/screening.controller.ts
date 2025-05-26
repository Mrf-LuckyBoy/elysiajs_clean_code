import { t } from "elysia";
import { ScreeningResponseSchema, ScreeningSchema } from "../model/screening.model";
import { createScreening } from "../usecase/create-screening";
import { HttpResponseSchema } from "@/core/http.response";

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
            summary: 'Create new screening data',
            description: 'Creates a new screening record with the specified data.',
            tags: ['Screening'],
        },
        handler: async (context: any) => {
            const { body, set } = context;
            try {
                 const screening = await createScreening(body);
                 set.status = 200
            return { 
                success: true, 
                data: screening,
                message: 'Success'
            };
            } catch (err: unknown) {
                if (err instanceof Error) {
                    if (err.message === 'Please select an assignment option') {
                        set.status = 400;
                        return {
                            success: false,
                            message: 'Bad Request',
                            detail: 'Please select an assignment option'
                        };
                    }
                    set.status = 500;
                    return {
                        success: false,
                        message: 'Internal Server Error',
                        detail: err.message
                    };
                } else {
                    set.status = 500;
                   return {
                        success: false,
                        message: 'Internal Server Error',
                        detail: 'Unknown error occurred'
                    };
                }
            }
           
        }
    }
};