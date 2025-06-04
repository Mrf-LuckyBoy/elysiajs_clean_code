import { PersonRepository } from '../infra/person.repository';

export async function getPersonById(pid: string) {
  const persons = await PersonRepository.findPersonID(pid);
  if (!persons) throw new Error('person not found');
  return persons;
}
