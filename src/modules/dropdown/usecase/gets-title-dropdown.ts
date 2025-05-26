import { DropdownRepository } from '../infra/dropdown.repository';

export async function getTitlesName() {
  const title = await DropdownRepository.dropdownTitle();
  return title;
}
