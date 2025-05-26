import { DropdownRepository } from '../infra/dropdown.repository';

export async function getNameUsersVhv() {
  const usersVhv = await DropdownRepository.dropdownUserVhv();
  return usersVhv;
}