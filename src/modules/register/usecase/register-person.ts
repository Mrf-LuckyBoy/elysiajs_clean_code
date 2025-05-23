import { PersonRepository } from '../infra/person.repository';
import type { RegisterFormDTO } from '../model/person.model';

export async function RegisterPerson(
  registerForm: RegisterFormDTO
): Promise<RegisterFormDTO> {
  const result: RegisterFormDTO =
    await PersonRepository.registerFrom(registerForm);
  return result;
}
