import { DropdownRepository } from '../infra/dropdown.repository';

export async function getRelationship() {
  const relationship = await DropdownRepository.dropdoewnRelationship();
  return relationship;
}
