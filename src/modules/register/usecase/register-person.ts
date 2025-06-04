import { PersonRepository } from '../infra/person.repository';
import type {
  // RegisterFormDTO,
  NewRegisterFormDTO,
} from '../model/person.model';

export async function RegisterPerson(registerForm: NewRegisterFormDTO): Promise<NewRegisterFormDTO> {
  const result: NewRegisterFormDTO = await PersonRepository.registerFrom(registerForm);
  return result;
}
