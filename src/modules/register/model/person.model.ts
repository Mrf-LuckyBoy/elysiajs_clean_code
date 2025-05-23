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
  boot_type: string;
  // consent: string;
  status: string;
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

export const RegisterFormSchema = t.Object({
  pid: t.String({ description: 'pid of the person' }),
  sex: t.String({ description: 'Sex (ชาย/หญิง)' }),
  idcard: t.String({ description: 'ID card number' }),
  title: t.String({ description: 'Title (e.g. นาย, นาง)' }),
  first_name: t.String({ description: 'First name' }),
  last_name: t.String({ description: 'Last name' }),
  birth: t.String({
    format: 'date',
    description: 'Date of birth (YYYY-MM-DD)',
  }),
  phone: t.String({ description: 'Phone number' }),
  boot_type: t.String({ description: 'Boot type' }),
  consent: t.String({ description: 'Consent (true/false)' }),
  status: t.String({ description: 'Status (approve/Cancel)' }),
  hcode: t.String({ description: 'House code' }),
  village: t.String({ description: 'Village' }),
  chronic_disease: t.String({ description: 'Chronic disease' }),
  allergy_history: t.String({ description: 'Allergy history' }),
  allergy_symptoms: t.String({ description: 'Allergy symptoms' }),

  guardian: t.Object({
    relationships: t.String({ description: 'Relationship to patient' }),
    idcard: t.String({ description: 'Guardian ID card' }),
    title: t.String({ description: 'Guardian title' }),
    first_name: t.String({ description: 'Guardian first name' }),
    last_name: t.String({ description: 'Guardian last name' }),
    birth: t.String({ format: 'date', description: 'Guardian birth date' }),
    phone: t.String({ description: 'Guardian phone' }),
    hcode: t.String({ description: 'Guardian house code' }),
    type_card: t.String({ description: 'Card type' }),
    hno: t.String({ description: 'House number' }),
    village: t.String({ description: 'Village' }),
    street: t.String({ description: 'Street' }),
    moo: t.String({ description: 'Moo' }),
    villcode: t.String({ description: 'Village code' }),
  }),

  address_cid: t.Object({
    hcode: t.String(),
    hno: t.String(),
    village: t.String(),
    street: t.String(),
    moo: t.String(),
    villcode: t.String(),
    created_at: t.Date(),
    updated_at: t.Date(),
  }),

  address_current: t.Object({
    hcode: t.String(),
    hno: t.String(),
    village: t.String(),
    street: t.String(),
    moo: t.String(),
    villcode: t.String(),
    created_at: t.Date(),
    updated_at: t.Date(),
  }),
});
