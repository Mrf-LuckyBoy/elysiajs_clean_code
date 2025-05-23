import { PersonRepository } from '../infra/person.repository';
import { GuardianDTO } from '../model/person.model';
import { randomUUID } from 'crypto';

export async function createGuardian(
  relationships: string,
  idcard: string,
  title: string,
  first_name: string,
  last_name: string,
  birth: Date,
  phone: string,
  hcode: string,
  created_at: Date,
  updated_at: Date
): Promise<GuardianDTO> {
  const newGuardian: GuardianDTO = {
    guardian_id: randomUUID(),
    relationships,
    idcard,
    title,
    first_name,
    last_name,
    birth,
    phone,
    hcode,
    created_at,
    updated_at,
  };

  await PersonRepository.createGuardian(newGuardian);
  return newGuardian;
}
