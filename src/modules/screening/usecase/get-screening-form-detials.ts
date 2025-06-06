import { ScreeningRepository } from '../infra/screening.repository';
import { Crypto } from '@/core/crypto';
import {
  ElderlySectionDTO,
  GetFormDetailsQuery,
  // GetScreeningFormDetailsDTO,
  MiniCogDTO,
  PersonalDetailsDTO,
  SocialSectionDTO,
  MockupData,
} from '../model/screening.model';
import { getScreeningFormJson } from './get-screening-form-json';
export async function getScreeningFormDetails(
  formID: string,
  query: GetFormDetailsQuery
): Promise<
  // | GetScreeningFormDetailsDTO
  | PersonalDetailsDTO
  | SocialSectionDTO
  | ElderlySectionDTO
  | MiniCogDTO
  | MockupData
  | null
> {
  try {
    const formDetails =
      await ScreeningRepository.getScreeningFormDetails(formID);

    if (!formDetails) {
      return null;
    }
    let sex = 'ชาย';
    if (formDetails.sex === 'F') {
      sex = 'หญิง';
    }
    const decryptedFirstName = Crypto.decrypt(formDetails?.first_name || '');
    const decryptedLastName = Crypto.decrypt(formDetails?.last_name || '');

    formDetails.first_name = decryptedFirstName || '';
    formDetails.last_name = decryptedLastName || '';

    switch (query.part) {
      case '1':
        return {
          social_1: formDetails.social_1,
          social_2: formDetails.social_2,
          social_3: formDetails.social_3,
        } as SocialSectionDTO;
      case '2':
        const elderlyData: ElderlySectionDTO = {
          elderly_1_1: formDetails.elderly_1_1,
          elderly_1_2: formDetails.elderly_1_2,
          elderly_2_1: formDetails.elderly_2_1,
          elderly_2_2: formDetails.elderly_2_2,
          elderly_3: formDetails.elderly_3,
          elderly_4: formDetails.elderly_4,
          elderly_5_1: formDetails.elderly_5_1,
          elderly_5_2: formDetails.elderly_5_2,
          elderly_6: formDetails.elderly_6,
          elderly_7: formDetails.elderly_7,
          elderly_8_1: formDetails.elderly_8_1,
          elderly_8_2: formDetails.elderly_8_2,
          elderly_9: formDetails.elderly_9,
          elderly_sum: formDetails.elderly_sum,
        };

        const mockupData = getScreeningFormJson(elderlyData);
        return mockupData as MockupData;
      case '3':
        return {
          visit_screening: formatDate(formDetails.visit_screening || null),
          image_id: formDetails.image_id,
          word_recall: formDetails.word_recall,
          clock_draw: formDetails.clock_draw,
          sum_mini_cog: formDetails.sum_mini_cog,
        } as MiniCogDTO;

      default:
        return {
          sex: sex,
          cid: formDetails.cid,
          title: formDetails.title,
          first_name: formDetails.first_name,
          last_name: formDetails.last_name,
          is_alone: formDetails.is_alone,
          hno: formDetails.hno,
          moo: formDetails.moo,
          soi_road: formDetails.soi_road,
          province: formDetails.province,
          district: formDetails.district,
          sub_district: formDetails.sub_district,
          postal_code: formDetails.postal_code,
        } as PersonalDetailsDTO;
    }
  } catch (error) {
    console.error('Error getting screening form details:', error);
    throw new Error(
      'เกิดข้อผิดพลาดในการดึงข้อมูล screening form details: ' + error
    );
  }
}

function formatDate(data: Date | null): string | null {
  if (!data) {
    return null;
  }
  const d = new Date(data);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = (d.getFullYear() + 543).toString();
  return `${day}/${month}/${year}`;
}
