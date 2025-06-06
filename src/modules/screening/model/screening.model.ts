import { t } from 'elysia';
export interface DecodedToken {
  user_id: string;
  cid_hash: string;
  hos_code: string;
  hos_name: string;
  title: string;
  fname: string;
  lname: string;
  position: string;
  hno: string;
  soi_road: string;
  province: string;
  district: string;
  sub_district: string;
  createAt: Date;
  updateAt: Date;
  iat: number;
  exp: number;
}

export interface CreateScreeningRequestDTO {
  // visit_id?: string;
  patient_id: string;
  visit_date: Date;
  reason_appointment: string;
  doctor_id: string;
  assign_id?: string | null;
  // assign_official_service_unit?: string | null;
  assign_id_vhv?: string | null;
  // assign_vhv_service_unit?: string | null;
  diagnosis_id?: string | null;
  // screening_form_id?: string;
  // status_screening?: string;
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
  reason_edit: string;
  reason_appointment: string;
  doctor_id: string;
  assign_id: string | null;
  assign_official_service_unit: string | null;
  assign_id_vhv: string | null;
  assign_vhv_service_unit: string | null;
  diagnosis_id: string | null;
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
  // visit_id: t.Optional(t.String()),
  patient_id: t.String(),
  visit_date: t.Date(),
  reason_appointment: t.String(),
  doctor_id: t.String(),
  assign_id: t.Optional(t.Nullable(t.String())),
  // assign_official_service_unit: t.Optional(t.Nullable(t.String())),
  assign_id_vhv: t.Optional(t.Nullable(t.String())),
  // assign_vhv_service_unit: t.Optional(t.Nullable(t.String())),
  diagnosis_id: t.Optional(t.Nullable(t.String())),
  // screening_form_id: t.Optional(t.String()),
  // status_screening: t.Optional(t.String()),
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
  assign_official_service_unit: t.Nullable(t.String()),
  assign_id_vhv: t.Nullable(t.String()),
  assign_vhv_service_unit: t.Nullable(t.String()),
  diagnosis_id: t.Nullable(t.String()),
  screening_form_id: t.String(),
  status_screening: t.String(),
  is_self: t.Boolean(),
  is_assign_official: t.Boolean(),
  is_assign_vhv: t.Boolean(),
  is_assign_vhv_service_unit: t.Boolean(),
  is_assgin_official_service_unit: t.Boolean(),
  is_diagnosis: t.Boolean(),
  created_at: t.Date(),
  updated_at: t.Date(),
});

export interface UpdateScreeningFormDTO {
  consent_by?: string;
  is_alone?: boolean;
  social_1?: boolean;
  social_2?: boolean;
  social_3?: boolean;
  elderly_1_1?: boolean;
  elderly_1_2?: boolean;
  elderly_2_1?: boolean;
  elderly_2_2?: boolean;
  elderly_3?: boolean;
  elderly_4?: boolean;
  elderly_5_1?: boolean;
  elderly_5_2?: boolean;
  elderly_6?: boolean;
  elderly_7?: boolean;
  elderly_8_1?: boolean;
  elderly_8_2?: boolean;
  elderly_9?: boolean;
  elderly_sum?: string;
  visit_screening?: Date;
  image_id?: string;
  word_recall?: number;
  clock_draw?: number;
  sum_mini_cog?: number;
  updated_at?: Date;
}
export interface UpdateScreeningFormRequestDTO {
  consent_by?: string;
  is_alone?: boolean;
  social_1?: boolean;
  social_2?: boolean;
  social_3?: boolean;
  elderly_1_1?: boolean;
  elderly_1_2?: boolean;
  elderly_2_1?: boolean;
  elderly_2_2?: boolean;
  elderly_3?: boolean;
  elderly_4?: boolean;
  elderly_5_1?: boolean;
  elderly_5_2?: boolean;
  elderly_6?: boolean;
  elderly_7?: boolean;
  elderly_8_1?: boolean;
  elderly_8_2?: boolean;
  elderly_9?: boolean;
  visit_screening?: Date;
  image_file?: File; // ไฟล์ที่ upload
  word_recall?: number;
  clock_draw?: number;
  sum_mini_cog?: number;
}

export const UpdateScreeningFormSchema = t.Object({
  consent_by: t.Optional(t.String()),
  is_alone: t.Optional(t.Union([t.Boolean(), t.String()])),
  social_1: t.Optional(t.Union([t.Boolean(), t.String()])),
  social_2: t.Optional(t.Union([t.Boolean(), t.String()])),
  social_3: t.Optional(t.Union([t.Boolean(), t.String()])),
  elderly_1_1: t.Optional(t.Union([t.Boolean(), t.String()])),
  elderly_1_2: t.Optional(t.Union([t.Boolean(), t.String()])),
  elderly_2_1: t.Optional(t.Union([t.Boolean(), t.String()])),
  elderly_2_2: t.Optional(t.Union([t.Boolean(), t.String()])),
  elderly_3: t.Optional(t.Union([t.Boolean(), t.String()])),
  elderly_4: t.Optional(t.Union([t.Boolean(), t.String()])),
  elderly_5_1: t.Optional(t.Union([t.Boolean(), t.String()])),
  elderly_5_2: t.Optional(t.Union([t.Boolean(), t.String()])),
  elderly_6: t.Optional(t.Union([t.Boolean(), t.String()])),
  elderly_7: t.Optional(t.Union([t.Boolean(), t.String()])),
  elderly_8_1: t.Optional(t.Union([t.Boolean(), t.String()])),
  elderly_8_2: t.Optional(t.Union([t.Boolean(), t.String()])),
  elderly_9: t.Optional(t.Union([t.Boolean(), t.String()])),
  elderly_sum: t.Optional(t.String()),
  visit_screening: t.Optional(t.Date({ format: 'date' })),
  image_id: t.Optional(t.File()),
  word_recall: t.Optional(t.Union([t.Number(), t.String()])),
  clock_draw: t.Optional(t.Union([t.Number(), t.String()])),
  sum_mini_cog: t.Optional(t.Union([t.Number(), t.String()])),
  updated_at: t.Optional(t.Date()),
});

export interface GetScreeningFormDetailsDTO {
  screening_form_id: string;
  sex: string;
  cid: string;
  title: string;
  first_name: string;
  last_name: string;
  //address
  is_alone?: boolean | null;
  hno: string | null;
  moo: string | null;
  soi_road: string | null;
  province: string | null;
  district: string | null;
  sub_district: string | null;
  postal_code: string | null;
  //part 1
  social_1?: boolean | null;
  social_2?: boolean | null;
  social_3?: boolean | null;
  //part 2
  elderly_1_1?: boolean | null;
  elderly_1_2?: boolean | null;
  elderly_2_1?: boolean | null;
  elderly_2_2?: boolean | null;
  elderly_3?: boolean | null;
  elderly_4?: boolean | null;
  elderly_5_1?: boolean | null;
  elderly_5_2?: boolean | null;
  elderly_6?: boolean | null;
  elderly_7?: boolean | null;
  elderly_8_1?: boolean | null;
  elderly_8_2?: boolean | null;
  elderly_9?: boolean | null;
  elderly_sum?: string | null;
  //part 3
  visit_screening?: Date | null;
  image_id?: string | null;
  word_recall?: number | null;
  clock_draw?: number | null;
  sum_mini_cog?: number | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface PersonalDetailsDTO {
  sex: string;
  cid: string;
  title: string;
  first_name: string;
  last_name: string;
  //address
  is_alone?: boolean;
  hno: string;
  moo: string;
  soi_road: string;
  province: string;
  district: string;
  sub_district: string;
  postal_code: string;
}

export interface SocialSectionDTO {
  social_1?: boolean | null;
  social_2?: boolean | null;
  social_3?: boolean | null;
}

export interface ElderlySectionDTO {
  elderly_1_1?: boolean | null;
  elderly_1_2?: boolean | null;
  elderly_2_1?: boolean | null;
  elderly_2_2?: boolean | null;
  elderly_3?: boolean | null;
  elderly_4?: boolean | null;
  elderly_5_1?: boolean | null;
  elderly_5_2?: boolean | null;
  elderly_6?: boolean | null;
  elderly_7?: boolean | null;
  elderly_8_1?: boolean | null;
  elderly_8_2?: boolean | null;
  elderly_9?: boolean | null;
  elderly_sum?: string | null;
}

export interface MiniCogDTO {
  visit_screening?: Date | null;
  image_id?: string | null;
  word_recall?: number | null;
  clock_draw?: number | null;
  sum_mini_cog?: number | null;
}

export interface GetFormDetailsQuery {
  part?: '' | '1' | '2' | '3';
}

export const GetFormDetailsQuerySchema = t.Object({
  part: t.Optional(
    t.Union([t.Literal(''), t.Literal('1'), t.Literal('2'), t.Literal('3')])
  ),
});

export const GetScreeningFormDetailsSchema = t.Object({
  screening_form_id: t.String(),
  consent_by: t.Optional(t.String()),
  sex: t.String(),
  cid: t.String(),
  title: t.String(),
  first_name: t.String(),
  last_name: t.String(),
  is_alone: t.Optional(t.Boolean()),
  hno: t.Nullable(t.String()),
  moo: t.Nullable(t.String()),
  soi_road: t.Nullable(t.String()),
  province: t.Nullable(t.String()),
  district: t.Nullable(t.String()),
  sub_district: t.Nullable(t.String()),
  postal_code: t.Nullable(t.String()),

  social_1: t.Optional(t.Nullable(t.Boolean())),
  social_2: t.Optional(t.Nullable(t.Boolean())),
  social_3: t.Optional(t.Nullable(t.Boolean())),

  elderly_1_1: t.Optional(t.Nullable(t.Boolean())),
  elderly_1_2: t.Optional(t.Nullable(t.Boolean())),
  elderly_2_1: t.Optional(t.Nullable(t.Boolean())),
  elderly_2_2: t.Optional(t.Nullable(t.Boolean())),
  elderly_3: t.Optional(t.Nullable(t.Boolean())),
  elderly_4: t.Optional(t.Nullable(t.Boolean())),
  elderly_5_1: t.Optional(t.Nullable(t.Boolean())),
  elderly_5_2: t.Optional(t.Nullable(t.Boolean())),
  elderly_6: t.Optional(t.Nullable(t.Boolean())),
  elderly_7: t.Optional(t.Nullable(t.Boolean())),
  elderly_8_1: t.Optional(t.Nullable(t.Boolean())),
  elderly_8_2: t.Optional(t.Nullable(t.Boolean())),
  elderly_9: t.Optional(t.Nullable(t.Boolean())),
  elderly_sum: t.Optional(t.Nullable(t.String())),

  visit_screening: t.Optional(t.Nullable(t.Date())),
  image_id: t.Optional(t.Nullable(t.String())),
  word_recall: t.Optional(t.Nullable(t.Number())),
  clock_draw: t.Optional(t.Nullable(t.Number())),
  sum_mini_cog: t.Optional(t.Nullable(t.Number())),

  created_at: t.Optional(t.Date()),
  updated_at: t.Optional(t.Date()),
});

export const PersonalDetailsSchema = t.Object({
  sex: t.String(),
  cid: t.String(),
  title: t.String(),
  first_name: t.String(),
  last_name: t.String(),
  is_alone: t.Optional(t.Boolean()),
  hno: t.String(),
  moo: t.String(),
  soi_road: t.String(),
  province: t.String(),
  district: t.String(),
  sub_district: t.String(),
  postal_code: t.String(),
});

export const SocialSectionSchema = t.Object({
  social_1: t.Optional(t.Nullable(t.Boolean())),
  social_2: t.Optional(t.Nullable(t.Boolean())),
  social_3: t.Optional(t.Nullable(t.Boolean())),
});

export const ElderlySectionSchema = t.Object({
  elderly_1_1: t.Optional(t.Nullable(t.Boolean())),
  elderly_1_2: t.Optional(t.Nullable(t.Boolean())),
  elderly_2_1: t.Optional(t.Nullable(t.Boolean())),
  elderly_2_2: t.Optional(t.Nullable(t.Boolean())),
  elderly_3: t.Optional(t.Nullable(t.Boolean())),
  elderly_4: t.Optional(t.Nullable(t.Boolean())),
  elderly_5_1: t.Optional(t.Nullable(t.Boolean())),
  elderly_5_2: t.Optional(t.Nullable(t.Boolean())),
  elderly_6: t.Optional(t.Nullable(t.Boolean())),
  elderly_7: t.Optional(t.Nullable(t.Boolean())),
  elderly_8_1: t.Optional(t.Nullable(t.Boolean())),
  elderly_8_2: t.Optional(t.Nullable(t.Boolean())),
  elderly_9: t.Optional(t.Nullable(t.Boolean())),
  elderly_sum: t.Optional(t.Nullable(t.String())),
});

export const MiniCogSchema = t.Object({
  visit_screening: t.Optional(t.Nullable(t.Date())),
  image_id: t.Optional(t.Nullable(t.String())),
  word_recall: t.Optional(t.Nullable(t.Number())),
  clock_draw: t.Optional(t.Nullable(t.Number())),
  sum_mini_cog: t.Optional(t.Nullable(t.Number())),
});

export interface Answer {
  img: string;
  value: string;
  label: string;
}

export interface Question {
  id: string;
  title: string;
  answer: Answer[];
}

export interface MockupItem {
  id: string;
  title: string;
  question: Question[];
}

export interface MockupData {
  MOCKUPDATA: MockupItem[];
  elderly_sum: string;
}

export const answerSchema = t.Object({
  img: t.String(),
  value: t.String(),
  label: t.String(),
});

export const questionSchema = t.Object({
  id: t.String(),
  title: t.String(),
  answer: t.Array(answerSchema),
});

export const mockupItemSchema = t.Object({
  id: t.String(),
  title: t.String(),
  question: t.Array(questionSchema),
});

export const mockupDataSchema = t.Object({
  MOCKUPDATA: t.Array(mockupItemSchema),
  elderly_sum: t.String(),
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
  visit_id: string;
  visit_date: string;
  visit_time: string;
  pid: string;
  person_fullname: string;
  provider_fullname: string;
  inscl_name: string;
  id_card: string;
  status_screening: string;
  role: string;
  screening_form_id: string;
}

export const ScreeningListResponseSchema = t.Object({
  visit_id: t.String(),
  visit_date: t.String(),
  visit_time: t.String(),
  pid: t.String(),
  person_fullname: t.String(),
  inscl_name: t.String(),
  provider_fullname: t.String(),
  id_card: t.String(),
  status_screening: t.String(),
  role: t.String(),
  screening_form_id: t.String(),
});

export interface StatusCounts {
  waiting: number;
  draft: number;
  completed: number;
}

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
    statusCounts?: StatusCounts;
  };
  message: string;
}

export const StatusCountsSchema = t.Object({
  waiting: t.Number(),
  draft: t.Number(),
  completed: t.Number(),
});

export const PaginationSchema = t.Object({
  page: t.Optional(t.Number({ minimum: 1, default: 1 })),
  limit: t.Optional(t.Number()),
  search: t.Optional(t.String()),
  filter: t.Optional(t.String()),
  status: t.Optional(t.String()),
  date: t.Optional(t.String({ format: 'date' })),
  statusCounts: t.Optional(StatusCountsSchema),
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
  reason_edit: string;
  appointment_reason: string;
  provider_name: string;
  type_assign: string;
  assign_name?: string | null;
  screening_form_id: string;
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
  reason_edit: t.String(),
  appointment_reason: t.String(),
  provider_name: t.String(),
  type_assign: t.String(),
  assign_name: t.Nullable(t.String()),
  screening_form_id: t.String(),
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
  address: string;
  reason_edit: string | null;
  appointment_reason: string;
  provider_title: string | null;
  provider_fname: string | null;
  provider_lname: string | null;
  assign_fname: string | null;
  assign_lname: string | null;
  is_self: boolean;
  is_assign_official: boolean;
  is_assign_vhv: boolean;
  is_assign_vhv_service_unit: boolean;
  is_assgin_official_service_unit: boolean;
  screening_form_id: string;
  assign_id: string | null;
  assign_id_vhv: string | null;
}

export interface UpdateVisitDateRequestDTO {
  visit_date: Date;
  reason_edit: string;
  updated_at?: Date;
}

export const UpdateVisitDateRequestSchema = t.Object({
  visit_date: t.Date({ format: 'date' }),
  reason_edit: t.String(),
  updated_at: t.Optional(t.Nullable(t.Date())),
});
