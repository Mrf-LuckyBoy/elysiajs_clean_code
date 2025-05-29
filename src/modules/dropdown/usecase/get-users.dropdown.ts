import { DropdownRepository } from '../infra/dropdown.repository';

export async function getNameUsers() {
  const users = await DropdownRepository.dropdownUser();
  return users;
}
