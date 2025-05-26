import { t } from 'elysia';

export interface PersonDTO {
  pid: string;
  pid_hdc: string;
  med_id: string;
  hcode_cid: string;
  sex: string; // likely 'M' or 'F', but just string as per varchar(1)
  idcard: string;
  title: string;
  first_name: string;
  last_name: string;
  birth: Date;
  phone: string;
  blood_type: string;
  status: 'approve' | 'cancel' | 'delete';
  reason_cancel: string;
  consent: boolean;
  hcode: string;
  guardian: string;
  is_delete: boolean | null; // nullable because not `.notNull()`
  village: string;
  hn: string;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface TitleNormalizeDTO {
  title_id: string;
  title_th: string;
  title_en: string;
}

export interface GuardianDTO {
  guardian_id: string;
  idcard: string;
  relationships: string;
  title: string;
  first_name: string;
  last_name: string;
  birth: Date;
  phone: string;
  hcode: string;
  created_at: Date;
  updated_at: Date;
}

export interface MedicalHistoryDTO {
  med_id: string;
  chronic_disease: string;
  allergy_history: string;
  allergy_symptoms: string;
  created_at: Date;
  updated_at: Date;
}

export interface AddressDTO {
  hcode: string;
  hno: string;
  hcode_hdc: string;
  village: string;
  street: string;
  moo: string;
  villcode: string;
  created_at: Date;
  updated_at: Date;
}

export interface Address_codeDTO {
  addresscode: string;
  provcode: string;
  provname: string;
  distcode: string;
  distname: string;
  subdistcode: string;
  subdistname: string;
  area: string;
  areacode: string;
  zipcode: string;
}

// export interface FullPersonProfileDTO {
//   person: PersonDTO;
//   medical_history?: MedicalHistoryDTO;
//   guardian?: GuardianDTO;
// }
//----
// ข้อมูลส่วนตัว + โรคประจำตัว
export interface RegisterFormDTO {
  pid: string;
  sex: string;
  idcard: string;
  title: string;
  first_name: string;
  last_name: string;
  birth: Date;
  phone: string;
  blood_type: string;
  // consent: string;
  // status: string;
  hcode: string;
  // guardian: string;
  village: string;
  // จาก medical_history table
  chronic_disease: string;
  allergy_history: string;
  allergy_symptoms: string;
  //
  guardian: RegisterGuardianDTO;
  address_cid: AddressDTO;
  address_current: AddressDTO;
  type_card: boolean;
  type_guardian: boolean;
  address_current_string: string;
  address_cid_string: string;
  address_guardian_string: string;
}

// ข้อมูลผู้ดูแล + ที่อยู่
export interface RegisterGuardianDTO {
  relationships: string;
  idcard: string;
  title: string;
  first_name: string;
  last_name: string;
  birth: Date;
  phone: string;
  // Address
  hcode: string;
  type_card: string;
  hno: string;
  village: string;
  street: string;
  moo: string;
  villcode: string;
}

// AddressDTO Schema
export const AddressSchema = t.Object({
  hcode: t.String(),
  hno: t.String(),
  hcode_hdc: t.String(),
  village: t.String(),
  street: t.String(),
  moo: t.String(),
  villcode: t.String(),
  created_at: t.String(), // Use string with date-time format
  updated_at: t.String(),
});

// RegisterGuardianDTO Schema
export const RegisterGuardianSchema = t.Object({
  relationships: t.String(),
  idcard: t.String(),
  title: t.String(),
  first_name: t.String(),
  last_name: t.String(),
  birth: t.String(),
  phone: t.String(),
  hcode: t.String(),
  type_card: t.String(),
  hno: t.String(),
  village: t.String(),
  street: t.String(),
  moo: t.String(),
  villcode: t.String(),
});

// RegisterFormDTO Schema
export const RegisterFormSchema = t.Object({
  pid: t.String(),
  sex: t.String(),
  idcard: t.String(),
  title: t.String(),
  first_name: t.String(),
  last_name: t.String(),
  birth: t.String(),
  phone: t.String(),
  blood_type: t.String(),
  // status: t.String(),
  hcode: t.String(),
  village: t.String(),
  chronic_disease: t.String(),
  allergy_history: t.String(),
  allergy_symptoms: t.String(),
  guardian: RegisterGuardianSchema,
  address_cid: AddressSchema,
  address_current: AddressSchema,
  // type_card: t.Boolean(),
  type_card: t.Optional(t.Nullable(t.Boolean())),
  type_guardian: t.Optional(t.Nullable(t.Boolean())),
  address_current_string: t.String(),
  address_cid_string: t.String(),
  address_guardian_string: t.String(),
});

export interface NewRegisterFormDTO {
  pid: string;
  sex: string;
  idcard: string;
  title: string;
  first_name: string;
  last_name: string;
  birth: Date;
  phone: string;
  blood_type: string;
  village: string;
  chronic_disease: string;
  allergy_history: string;
  allergy_symptoms: string;
  guardian: NewRegisterGuardianDTO;
  address_cid: NewAddressDTO;
  address_current: NewAddressDTO;
  type_card: boolean;
  type_guardian: boolean;
  address_current_string: string;
  address_cid_string: string;
  address_guardian_string: string;
}

export interface NewRegisterGuardianDTO {
  relationships: string;
  idcard: string;
  title: string;
  first_name: string;
  last_name: string;
  birth: Date;
  phone: string;
  hcode: string;
  hno: string;
  village: string;
  street: string;
  moo: string;
  villcode: string;
}

export interface NewAddressDTO {
  hcode: string;
  hno: string;
  hcode_hdc: string;
  village: string;
  street: string;
  moo: string;
  villcode: string;
}

export const NewAddressSchema = t.Object({
  hcode: t.String(),
  hno: t.String(),
  hcode_hdc: t.String(),
  village: t.String(),
  street: t.String(),
  moo: t.String(),
  villcode: t.String(),
});

export const NewRegisterGuardianSchema = t.Object({
  relationships: t.String(),
  idcard: t.String(),
  title: t.String(),
  first_name: t.String(),
  last_name: t.String(),
  birth: t.String({ format: 'date-time', default: '2001-11-11' }), // or 'date' depending on your format
  phone: t.String(),
  hcode: t.String(),
  hno: t.String(),
  village: t.String(),
  street: t.String(),
  moo: t.String(),
  villcode: t.String(),
});

export const NewRegisterFormSchema = t.Object({
  pid: t.String(),
  sex: t.String(),
  idcard: t.String(),
  title: t.String(),
  first_name: t.String(),
  last_name: t.String(),
  birth: t.String({ format: 'date-time', default: '2001-11-11' }), // or 'date'
  phone: t.String(),
  blood_type: t.String(),
  village: t.String(),
  chronic_disease: t.String(),
  allergy_history: t.String(),
  allergy_symptoms: t.String(),
  guardian: NewRegisterGuardianSchema,
  address_cid: NewAddressSchema,
  address_current: NewAddressSchema,
  type_card: t.Boolean(),
  type_guardian: t.Boolean(),
  address_current_string: t.String(),
  address_cid_string: t.String(),
  address_guardian_string: t.String(),
});
