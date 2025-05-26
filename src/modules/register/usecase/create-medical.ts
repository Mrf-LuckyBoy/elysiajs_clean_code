import { PersonRepository } from '../infra/person.repository';
import { MedicalHistoryDTO } from '../model/person.model';
import { randomUUID } from 'crypto';

export async function createMedical(
  chronic_disease: string,
  allergy_history: string,
  allergy_symptoms: string,
  created_at: Date,
  updated_at: Date
): Promise<MedicalHistoryDTO> {
  const newMedical: MedicalHistoryDTO = {
    med_id: randomUUID(),
    chronic_disease,
    allergy_history,
    allergy_symptoms,
    created_at,
    updated_at,
  };

  await PersonRepository.createMedical(newMedical);
  return newMedical;
}
