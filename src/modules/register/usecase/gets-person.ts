import { PersonRepository } from '../infra/person.repository';

export async function getPerson() {
  const person = await PersonRepository.finds();
  return person;
}
