import { DropdownRepository } from '../infra/dropdown.repository';

export async function getAddressCode() {
  const addresscode = await DropdownRepository.dropdoewnAddress();
  return addresscode;
}
