import { ScreeningRepository } from "../infra/screening.repository";
import { ScreeningRequestDTO, ScreeningResponseDTO } from "../model/screening.model";
import { randomUUID } from 'crypto';
export async function createScreening(body: ScreeningRequestDTO): Promise<void> {
const currentTime = new Date();
const newScreeningFormID = randomUUID();

    const newScreening: ScreeningResponseDTO = {
        visit_id: randomUUID(),
        patient_id: body.patient_id,
        visit_date: body.visit_date,
        reason_appointment: body.reason_appointment,
        doctor_id: body.doctor_id,
        assign_id: null,
        assign_vhv_village_id: null,
        assign_vhv_service_unit: null,
        screening_form_id: newScreeningFormID,
        status_screening: "รอบันทึก",
        is_self: false,
        is_assign_official: false,
        is_assign_vhv: false,
        is_assign_vhv_village: false,
        is_assign_vhv_service_unit: false,
        is_assgin_official_service_unit: false,
        is_diagnosis: false,
        created_at: currentTime,
        updated_at: currentTime
    }

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
        newScreening.assign_id = body.assign_id || null;
         }else if (body.is_assgin_official_service_unit === true) {
        //is_assgin_official_service_unit
        newScreening.is_assgin_official_service_unit = true;
        newScreening.assign_id = body.assign_id || null;
       } else if (body.is_assign_vhv_village === true) {
        //is_assign_vhv_village
        newScreening.is_assign_vhv_village = true;
        newScreening.assign_id = null;
        newScreening.assign_vhv_village_id = body.assign_vhv_village_id || null;
       } else if (body.is_assign_vhv_service_unit === true) {
        //is_assign_vhv_service_unit
        newScreening.is_assign_vhv_service_unit = true;
        newScreening.assign_id = null;
        newScreening.assign_vhv_service_unit = body.assign_vhv_service_unit || null;
      } else {
        throw new Error('Please select an assignment option');
    }

    const initScreeningForm = {
               screening_form_id: newScreeningFormID,
                consent_by: '',
                is_alone: false,
                social_1: false,
                social_2: false,
                social_3: false,
                elderly_1_1: false,
                elderly_1_2: false,
                elderly_2_1: false,
                elderly_2_2: false,
                elderly_3: false,
                elderly_4: false,
                elderly_5_1: false,
                elderly_5_2: false,
                elderly_6: false,
                elderly_7: false,
                elderly_8_1: false,
                elderly_8_2: false,
                elderly_9: false,
                elderly_sum: '',
                visit_screening: new Date(),
                image_id: '',
                word_recall: 0,
                clock_draw: 0,
                sum_mini_cog: 0,
                created_at: new Date(),
                updated_at: new Date(),
    };

    await ScreeningRepository.create(
        newScreening, initScreeningForm
    );
    
}
