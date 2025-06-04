import { PersonRepository } from '../infra/person.repository';

export async function getFormPerson(
  search: string,
  page: number,
  limit: number
) {
  const { data, totalItems } = await PersonRepository.findsPersonAll(
    search,
    page,
    limit
  );
  return { data, totalItems };
}
