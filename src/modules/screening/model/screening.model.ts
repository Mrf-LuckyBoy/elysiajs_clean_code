import { t } from "elysia";

export interface ScreeningRequestDTO {
    visit_id?: string;
    patient_id: string;
    visit_date: Date;
    reason_appointment: string;
    doctor_id: string;
    assign_id?: string | null;
    assign_vhv_village_id?: string | null;
    assign_vhv_service_unit?: string | null;
    screening_form_id?: string;
    status_screening?: string;
    is_self?: boolean;
    is_assign_official?: boolean;
    is_assign_vhv?: boolean;
    is_assign_vhv_village?: boolean;
    is_assign_vhv_service_unit?: boolean;
    is_diagnosis?: boolean;
}

export interface ScreeningResponseDTO {
    visit_id: string;
    patient_id: string;
    visit_date: Date;
    reason_appointment: string;
    doctor_id: string;
    assign_id: string | null;
    assign_vhv_village_id: string | null;
    assign_vhv_service_unit: string | null;
    screening_form_id: string;
    status_screening: string;
    is_self: boolean;
    is_assign_official: boolean;
    is_assign_vhv: boolean;
    is_assign_vhv_village: boolean;
    is_assign_vhv_service_unit: boolean;
    is_diagnosis: boolean;
    createAt: Date;
    updateAt: Date;
}

export const ScreeningSchema = t.Object({
    visit_id: t.Optional(t.String()),
    patient_id: t.String(),
    visit_date: t.Date(),
    reason_appointment: t.String(),
    doctor_id: t.String(),
    assign_id: t.Optional(t.Nullable(t.String())),
    assign_vhv_village_id: t.Optional(t.Nullable(t.String())),
    assign_vhv_service_unit: t.Optional(t.Nullable(t.String())),
    screening_form_id: t.Optional(t.String()),
    status_screening: t.Optional(t.String()),
    is_self: t.Optional(t.Boolean()),
    is_assign_official: t.Optional(t.Boolean()),
    is_assign_vhv: t.Optional(t.Boolean()),
    is_assign_vhv_village: t.Optional(t.Boolean()),
    is_assign_vhv_service_unit: t.Optional(t.Boolean()),
    is_diagnosis: t.Optional(t.Boolean()),
});

export const ScreeningResponseSchema = t.Object({
    visit_id: t.String(),
    patient_id: t.String(),
    visit_date: t.Date(),
    reason_appointment: t.String(),
    doctor_id: t.String(),
    assign_id: t.Nullable(t.String()),
    assign_vhv_village_id: t.Nullable(t.String()),
    assign_vhv_service_unit: t.Nullable(t.String()),
    screening_form_id: t.String(),
    status_screening: t.String(),
    is_self: t.Boolean(),
    is_assign_official: t.Boolean(),
    is_assign_vhv: t.Boolean(),
    is_assign_vhv_village: t.Boolean(),
    is_assign_vhv_service_unit: t.Boolean(),
    is_diagnosis: t.Boolean(),
    createAt: t.Date(),
    updateAt: t.Date()
});