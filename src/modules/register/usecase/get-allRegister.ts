import { PersonRepository } from '../infra/person.repository';

// export async function getFormPerson() {
//   const person = await PersonRepository.findsPersonAll();
//   return person ?? [];
// }

export async function getFormPerson(page: number, limit: number) {
  const person = await PersonRepository.findsPersonAll(page, limit);
  const totalItems = await PersonRepository.countAllPersons();

  return {
    data: person ?? [],
    totalItems,
  };
}
