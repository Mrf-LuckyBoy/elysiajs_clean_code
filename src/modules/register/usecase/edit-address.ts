import { PersonRepository } from '../infra/person.repository';
import { FormAddressDTO } from '../model/person.model';

export async function editAddress(address: FormAddressDTO): Promise<FormAddressDTO> {
  await PersonRepository.editFormAddress(address);
  return address;
}
