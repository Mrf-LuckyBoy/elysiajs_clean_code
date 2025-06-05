import { PersonRepository } from '../infra/person.repository';
import { editGuardianDTO } from '../model/person.model';

export async function editGuardian(guardian: editGuardianDTO): Promise<editGuardianDTO> {
  await PersonRepository.editFormGuardian(guardian);
  return guardian;
}
