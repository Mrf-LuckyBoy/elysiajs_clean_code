import { ScreeningRepository } from '../infra/screening.repository';
import {
  DecodedToken,
  GetScreeningByVisitIDDTO,
} from '../model/screening.model';
import { Crypto } from '@/core/crypto';
export async function getScreeningByVisitID(
  visitID: string,
  cookie: DecodedToken
): Promise<GetScreeningByVisitIDDTO | null> {
  const hosCode = cookie.hos_code;
  const screening = await ScreeningRepository.findScreeningByVisitID(
    visitID,
    hosCode
  );
  if (!screening) {
    return null;
  }

  const decryptedPersonFname = Crypto.decrypt(screening.person_fname || '');
  const decryptedPersonLname = Crypto.decrypt(screening.person_lname || '');
  const decryptedProviderFname = Crypto.decrypt(screening.provider_fname || '');
  const decryptedProviderLname = Crypto.decrypt(screening.provider_lname || '');
  const decryptedIDCard = Crypto.decrypt(screening.person_cid || '');
  const maskedIDCard = decryptedIDCard.replace(/.(?=.{4})/g, 'X');
  const decryptedAssignFname = screening.assign_fname
    ? Crypto.decrypt(screening.assign_fname)
    : '';
  const decryptedAssignLname = screening.assign_lname
    ? Crypto.decrypt(screening.assign_lname)
    : '';
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

  if (screening.sex === 'M') {
    screening.sex = 'ชาย';
  } else if (screening.sex === 'F') {
    screening.sex = 'หญิง';
  }

  let typeAssign = '';

  if (screening.is_self) {
    typeAssign = 'is_self';
  } else if (screening.is_assign_official) {
    typeAssign = 'is_assign_official';
  } else if (screening.is_assign_vhv) {
    typeAssign = 'is_assign_vhv';
  } else if (screening.is_assign_vhv_service_unit) {
    typeAssign = 'is_assign_vhv_service_unit';
  } else if (screening.is_assgin_official_service_unit) {
    typeAssign = 'is_assgin_official_service_unit';
  }

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
    address: screening.address || '',
    reason_edit: screening.reason_edit || '',
    appointment_reason: screening.appointment_reason,
    provider_name: `${screening.provider_title} ${decryptedProviderFname} ${decryptedProviderLname}`,
    type_assign: typeAssign,
    assign_name: `${decryptedAssignFname} ${decryptedAssignLname}`,
    screening_form_id: screening.screening_form_id,
  };

  return result;
}
