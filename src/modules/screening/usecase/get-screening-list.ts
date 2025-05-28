import { ScreeningRepository } from "../infra/screening.repository";
import { ScreeningListResponseDTO, SqlScreeningResponse } from "../model/screening.model";
import { Crypto } from '@/core/crypto';

export async function getScreeningList(): Promise<ScreeningListResponseDTO[]> {
    try {
    const rawScreeningList = await ScreeningRepository.findScreeningList();
    if (!rawScreeningList || rawScreeningList.length === 0) {
      return [];
    }
    return rawScreeningList.map(convertToDTO);
} catch (error) {
    console.error('Error fetching screening list:', error);
    return [];
  }
}

function convertToDTO(rawData: SqlScreeningResponse): ScreeningListResponseDTO {
        const date = new Date(rawData.visit_date.getTime() + (7 * 60 * 60 * 1000));

        const decryptedPersonFname = Crypto.decrypt(rawData.person_fname || '');
        const decryptedPersonLname = Crypto.decrypt(rawData.person_lname || '');
        const decryptedProviderFname = Crypto.decrypt(rawData.provider_fname || '');
        const decryptedProviderLname = Crypto.decrypt(rawData.provider_lname || '');
        const decryptedIdCard = Crypto.decrypt(rawData.id_card || '');
        
    // Mask เลขบัตรประชาชน
    const hidedCardNumber = maskCardNumber(decryptedIdCard);    return {

        visit_id: rawData.visit_id,
        visit_date: date.toISOString().split('T')[0],
        visit_time: date.toISOString().split('T')[1].split('.')[0],
        person_name: `${rawData.person_title} ${decryptedPersonFname} ${decryptedPersonLname}`,
        coverage_name: 'ประกันสังคม',
        provider_name: `${rawData.provider_title} ${decryptedProviderFname} ${decryptedProviderLname}`,
        id_card: hidedCardNumber || '',
        status_screening: rawData.status_screening,
        role: rawData.role || '',
        screening_form_id: rawData.screening_form_id
    }
}

function maskCardNumber(cardNumber: string): string {

    if (cardNumber.length !== 13) {
        console.log('Invalid card number length:', cardNumber.length);
    return cardNumber;
  }
    const maskedPart = cardNumber.slice(0, 9).replace(/\d/g, 'X');
    const lastFourDigits = cardNumber.slice(-4);
   const result = maskedPart + lastFourDigits;
   
  return result;
}
