import { t } from 'elysia';

export interface ScreeningRequestDTO {
    visit_id?: string;
    patient_id: string;
    visit_date: Date;
    reason_appointment: string;
    doctor_id: string;
    assign_id?: string | null;
    assign_vhv_service_unit?: string | null;
    screening_form_id?: string;
    status_screening?: string;
    is_self?: boolean;
    is_assign_official?: boolean;
    is_assign_vhv?: boolean;
    is_assign_vhv_service_unit?: boolean;
    is_assgin_official_service_unit?: boolean;
    is_diagnosis?: boolean;
}

export interface ScreeningResponseDTO {
    visit_id: string;
    patient_id: string;
    visit_date: Date;
    reason_appointment: string;
    doctor_id: string;
    assign_id: string | null;
    assign_vhv_service_unit: string | null;
    screening_form_id: string;
    status_screening: string;
    is_self: boolean;
    is_assign_official: boolean;
    is_assign_vhv: boolean;
    is_assign_vhv_service_unit: boolean;
    is_assgin_official_service_unit: boolean;
    is_diagnosis: boolean;
    created_at: Date;
    updated_at: Date;
}

export const ScreeningSchema = t.Object({
    visit_id: t.Optional(t.String()),
    patient_id: t.String(),
    visit_date: t.Date(),
    reason_appointment: t.String(),
    doctor_id: t.String(),
    assign_id: t.Optional(t.Nullable(t.String())),
    assign_vhv_service_unit: t.Optional(t.Nullable(t.String())),
    screening_form_id: t.Optional(t.String()),
    status_screening: t.Optional(t.String()),
    is_self: t.Optional(t.Boolean()),
    is_assign_official: t.Optional(t.Boolean()),
    is_assign_vhv: t.Optional(t.Boolean()),
    is_assign_vhv_service_unit: t.Optional(t.Boolean()),
    is_assgin_official_service_unit: t.Optional(t.Boolean()),
    is_diagnosis: t.Optional(t.Boolean()),
});

export const ScreeningResponseSchema = t.Object({
    visit_id: t.String(),
    patient_id: t.String(),
    visit_date: t.Date(),
    reason_appointment: t.String(),
    doctor_id: t.String(),
    assign_id: t.Nullable(t.String()),
    assign_vhv_service_unit: t.Nullable(t.String()),
    screening_form_id: t.String(),
    status_screening: t.String(),
    is_self: t.Boolean(),
    is_assign_official: t.Boolean(),
    is_assign_vhv: t.Boolean(),
    is_assign_vhv_service_unit: t.Boolean(),
    is_assgin_official_service_unit: t.Boolean(),
    is_diagnosis: t.Boolean(),
    created_at: t.Date(),
    updated_at: t.Date()
});

export interface UpdateScreeningFormDTO {
    consent_by: string;
    is_alone: boolean;
    social_1: boolean;
    social_2: boolean;
    social_3: boolean;
    elderly_1_1: boolean;
    elderly_1_2: boolean;
    elderly_2_1: boolean;
    elderly_2_2: boolean;
    elderly_3: boolean;
    elderly_4: boolean;
    elderly_5_1: boolean;
    elderly_5_2: boolean;
    elderly_6: boolean;
    elderly_7: boolean;
    elderly_8_1: boolean;
    elderly_8_2: boolean;
    elderly_9: boolean;
    elderly_sum: string;
    visit_screening: Date;
    image_id: string;
    word_recall: number;
    clock_draw: number;
    sum_mini_cog: number
    updated_at?: Date;
}

export const UpdateScreeningFormSchema = t.Object({
    consent_by: t.String(),
    is_alone: t.Boolean(),
    social_1: t.Boolean(),
    social_2: t.Boolean(),
    social_3: t.Boolean(),
    elderly_1_1: t.Boolean(),
    elderly_1_2: t.Boolean(),
    elderly_2_1: t.Boolean(),
    elderly_2_2: t.Boolean(),
    elderly_3: t.Boolean(),
    elderly_4: t.Boolean(),
    elderly_5_1: t.Boolean(),
    elderly_5_2: t.Boolean(),
    elderly_6: t.Boolean(),
    elderly_7: t.Boolean(),
    elderly_8_1: t.Boolean(),
    elderly_8_2: t.Boolean(),
    elderly_9: t.Boolean(),
    elderly_sum: t.String(),
    visit_screening: t.Date(),
    image_id: t.String(),
    word_recall: t.Number(),
    clock_draw: t.Number(),
    sum_mini_cog: t.Number(),
    updated_at: t.Optional(t.Date())
});

export interface SqlScreeningResponse {
    visit_id: string;
    visit_date: Date;
    person_id: string | null;
    person_title: string | null;
    person_fname: string | null;
    person_lname: string | null;
    inscl_code: string | null;
    inscl_name: string | null;
    provider_title: string | null; 
    provider_fname: string | null;
    provider_lname: string | null;
    id_card: string | null;
    status_screening: string;
    role: string | null;
    screening_form_id: string;

    
}
export interface ScreeningListResponseDTO {
    visit_id: string,
    visit_date: string,
    visit_time: string,
    person_fullname: string,
    provider_fullname: string,
    inscl_name: string,
    id_card: string,
    status_screening: string,
    role: string,
    screening_form_id: string
}

export const ScreeningListResponseSchema = t.Object({
    visit_id: t.String(),
    visit_date: t.String(),
    visit_time: t.String(),
    person_fullname: t.String(),
    inscl_name: t.String(),
    provider_fullname: t.String(),
    id_card: t.String(),
    status_screening: t.String(),
    role: t.String(),
    screening_form_id: t.String()
});

export interface PaginationQuery {
    page?: number;
    limit?: number;
    search?: string;
    filter?: string;
    status?: string;
    date?: string;
}

export interface PaginationResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        total: number;
        page: number;
        limit: number;
    };
    message: string;
}

export const PaginationSchema = t.Object({
    page: t.Optional(t.Number({ minimum: 1, default: 1 })),
    limit: t.Optional(t.Number()),
    search: t.Optional(t.String()),
    filter: t.Optional(t.String()),
    status: t.Optional(t.String()),
    date: t.Optional(t.String({ format: 'date' }))
});

export interface GetScreeningByVisitIDDTO {
    visit_id: string;
    person_cid: string;
    visit_date: string;
    visit_time: string;
    pid: string;
    person_name: string;
    hn: string;
    sex: string;
    age: string;
    address: string;
    appointment_reason: string;
    provider_name: string;
    is_self: boolean;
    is_assign_official: boolean;
    is_assign_vhv: boolean;
    is_assign_vhv_service_unit: boolean;
    is_assgin_official_service_unit: boolean;
    screening_form_id: string
    hcode_cid: string
}

export const GetScreeningByVisitIDSchema = t.Object({
    visit_id: t.String(),
    person_cid: t.String(),
    visit_date: t.String(),
    visit_time: t.String(),
    pid: t.String(),
    person_name: t.String(),
    hn: t.String(),
    sex: t.String(),
    age: t.String(),
    address: t.Union([t.String(), t.Null()]),
    appointment_reason: t.String(),
    provider_name: t.String(),
    is_self: t.Boolean(),
    is_assign_official: t.Boolean(),
    is_assign_vhv: t.Boolean(),
    is_assign_vhv_service_unit: t.Boolean(),
    is_assgin_official_service_unit: t.Boolean(),
    screening_form_id: t.String(),
    hcode_cid: t.String()
});

export interface SqlScreeningByVisitIDResponse {
    visit_id: string;
    visit_date: Date;
    person_id: string | null;
    person_cid: string | null;
    person_title: string | null;
    person_fname: string | null;
    person_lname: string | null;
    hn: string | null;
    sex: string | null;
    age: Date | null;
    address: string | null;
    appointment_reason: string;
    provider_title: string  | null;
    provider_fname: string  | null;
    provider_lname: string  | null;
    is_self: boolean;
    is_assign_official: boolean;
    is_assign_vhv: boolean;
    is_assign_vhv_service_unit: boolean;
    is_assgin_official_service_unit: boolean;
    screening_form_id: string;
    // address
    hno: string | null;
    moo: string | null;
    street: string | null;
    village: string | null;
    provname: string | null;
    distname: string | null;
    subdistname: string | null;
    hcode_cid: string | null;
}

export interface UpdateVisitDateRequestDTO {
    visit_date: Date;
    change_visit_date_reason: string;
    updated_at?: Date
}

export const UpdateVisitDateRequestSchema = t.Object({
    visit_date: t.Date({ format: 'date' }),
    change_visit_date_reason: t.String(),
    updated_at: t.Optional(t.Date({ format: 'date-time' }))
});