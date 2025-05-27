import { PersonRepository } from '../infra/person.repository';

export async function getFormPerson() {
  const { date } = await PersonRepository.finds();
  return date;
}
