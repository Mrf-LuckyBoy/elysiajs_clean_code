import { persons } from "@/db/schema";
import { ScreeningRepository } from "../infra/screening.repository";
import { GetScreeningByVisitIDDTO, ScreeningResponseDTO } from "../model/screening.model";
import { Crypto } from '@/core/crypto';
export async function getScreeningByVisitID(visitID: string): Promise<GetScreeningByVisitIDDTO> {
    
    const screening = await ScreeningRepository.findScreeningByVisitID(visitID);
    if (!screening) {
        throw new Error('Screening not found');
    }

    const decryptedPersonFname = Crypto.decrypt(screening.person_fname || '');
    const decryptedPersonLname = Crypto.decrypt(screening.person_lname || '');
    const decryptedProviderFname = Crypto.decrypt(screening.provider_fname || '');
    const decryptedProviderLname = Crypto.decrypt(screening.provider_lname || '');
    const decryptedIDCard = Crypto.decrypt(screening.person_cid || '');
    const maskedIDCard = decryptedIDCard.replace(/.(?=.{4})/g, 'X');

        const calulateAge = (birthDate: Date | null): string => {
        if (!birthDate) {
            return '0 ปี 0 เดือน 0 วัน';
        }

        const today = new Date();
        const birth = new Date(birthDate);

        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();

        if (days < 0) {
            months--;

            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        if (years < 0) {
            return '0 ปี 0 เดือน 0 วัน';
        }

        return `${years} ปี ${months} เดือน ${days} วัน`;
    };

    const addressData = `${screening.hno} หมู่ ${screening.moo} ถนน ${screening.street} หมู่ ${screening.village} ตำบล ${screening.subdistname} อำเภอ ${screening.distname} จังหวัด ${screening.provname}`;

    const result: GetScreeningByVisitIDDTO = {
        visit_id: screening.visit_id,
        person_cid: maskedIDCard || '',
        visit_date: screening.visit_date.toISOString().split('T')[0],
        visit_time: screening.visit_date.toISOString().split('T')[1].split('.')[0],
        pid: screening.person_id || '',
        person_name: `${screening.person_title} ${decryptedPersonFname} ${decryptedPersonLname}`,
        hn: screening.hn || '',
        sex: screening.sex || '',
        age: calulateAge(screening.age),
        address: addressData || '',
        appointment_reason: screening.appointment_reason,
        provider_name: `${screening.provider_title} ${decryptedProviderFname} ${decryptedProviderLname}`,
        is_self: screening.is_self,
        is_assign_official: screening.is_assign_official,
        is_assign_vhv: screening.is_assign_vhv,
        is_assign_vhv_service_unit: screening.is_assign_vhv_service_unit,
        is_assgin_official_service_unit: screening.is_assgin_official_service_unit,
        screening_form_id: screening.screening_form_id,
        hcode_cid: screening.hcode_cid || ''
    }

    return result;
}