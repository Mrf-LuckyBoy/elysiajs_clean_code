import { ScreeningRepository } from "../infra/screening.repository";
import { ScreeningRequestDTO, ScreeningResponseDTO } from "../model/screening.model";
import { randomUUID } from 'crypto';
export async function createScreening(body: ScreeningRequestDTO): Promise<ScreeningResponseDTO> {
const currentTime = new Date();

    const newScreening: ScreeningResponseDTO = {
        visit_id: randomUUID(),
        patient_id: body.patient_id,
        visit_date: body.visit_date,
        reason_appointment: body.reason_appointment,
        doctor_id: body.doctor_id,
        assign_id: null,
        assign_vhv_village_id: null,
        assign_vhv_service_unit: null,
        screening_form_id: randomUUID(),
        status_screening: "รอบันทึก",
        is_self: false,
        is_assign_official: false,
        is_assign_vhv: false,
        is_assign_vhv_village: false,
        is_assign_vhv_service_unit: false,
        is_diagnosis: false,
        createAt: currentTime,
        updateAt: currentTime
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

    await ScreeningRepository.create(newScreening);
    return newScreening
}
