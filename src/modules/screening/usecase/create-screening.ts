import { ScreeningRepository } from '../infra/screening.repository';
import { CreateScreeningRequestDTO, DecodedToken, ScreeningResponseDTO } from '../model/screening.model';
import { randomUUID } from 'crypto';
export async function createScreening(body: CreateScreeningRequestDTO, cookie: DecodedToken): Promise<void> {
  const currentTime = new Date();
  const newScreeningFormID = randomUUID();

  const newScreening: ScreeningResponseDTO = {
    visit_id: randomUUID(),
    patient_id: body.patient_id,
    visit_date: body.visit_date,
    reason_appointment: body.reason_appointment,
    reason_edit: '',
    doctor_id: body.doctor_id,
    assign_id: null,
    assign_official_service_unit: null,
    assign_id_vhv: null,
    assign_vhv_service_unit: null,
    diagnosis_id: null,
    screening_form_id: newScreeningFormID,
    status_screening: 'รอบันทึก',
    is_self: false,
    is_assign_official: false,
    is_assign_vhv: false,
    is_assign_vhv_service_unit: false,
    is_assgin_official_service_unit: false,
    is_diagnosis: false,
    created_at: currentTime,
    updated_at: currentTime,
  };

  if (body.is_self === true) {
    // หากเป็น self ให้ assign_id = doctor_id
    newScreening.is_self = true;
    newScreening.assign_id = body.doctor_id;
    // is_assign_official
  } else if (body.is_assign_official === true) {
    newScreening.is_assign_official = true;
    newScreening.assign_id = body.assign_id || null;
  } else if (body.is_assign_vhv === true) {
    //is_assign_vhv
    newScreening.is_assign_vhv = true;
    newScreening.assign_id_vhv = body.assign_id_vhv || null;
  } else if (body.is_assgin_official_service_unit === true) {
    //is_assgin_official_service_unit
    newScreening.is_assgin_official_service_unit = true;
    newScreening.assign_official_service_unit = cookie.hos_code || null;
  } else if (body.is_assign_vhv_service_unit === true) {
    //is_assign_vhv_service_unit
    newScreening.is_assign_vhv_service_unit = true;
    newScreening.assign_vhv_service_unit = cookie.hos_code || null;
  } else {
    throw new Error('Please select an assignment option');
  }

  const initScreeningForm = {
    screening_form_id: newScreeningFormID,
    consent_by: undefined,
    is_alone: undefined,
    social_1: undefined,
    social_2: undefined,
    social_3: undefined,
    elderly_1_1: undefined,
    elderly_1_2: undefined,
    elderly_2_1: undefined,
    elderly_2_2: undefined,
    elderly_3: undefined,
    elderly_4: undefined,
    elderly_5_1: undefined,
    elderly_5_2: undefined,
    elderly_6: undefined,
    elderly_7: undefined,
    elderly_8_1: undefined,
    elderly_8_2: undefined,
    elderly_9: undefined,
    elderly_sum: undefined,
    visit_screening: undefined,
    image_id: undefined,
    word_recall: undefined,
    clock_draw: undefined,
    sum_mini_cog: undefined,
    created_at: new Date(),
    updated_at: new Date(),
  };

  await ScreeningRepository.create(newScreening, initScreeningForm);
}
