import { PersonRepository } from '../infra/person.repository';
import { editPersonDTO } from '../model/person.model';

export async function editPerson(
  person: editPersonDTO
): Promise<editPersonDTO> {
  await PersonRepository.editFormPerson(person);
  return person;
}
