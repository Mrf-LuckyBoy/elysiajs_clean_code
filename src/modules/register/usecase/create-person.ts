import { PersonRepository } from '../infra/person.repository';
import { PersonDTO } from '../model/person.model';
import { randomUUID } from 'crypto';

export async function createPerson(
  med_id: string,
  sex: string,
  idcard: string,
  title: string,
  first_name: string,
  last_name: string,
  birth: Date,
  phone: string,
  boot_type: string,
  consent: string,
  status: string,
  reason_cancel: string,
  hcode: string,
  guardian: string,
  is_delect: string,
  village: string,
  created_at: Date,
  updated_at: Date
): Promise<PersonDTO> {
  const newPerson: PersonDTO = {
    pid: randomUUID(),
    med_id,
    sex,
    idcard,
    title,
    first_name,
    last_name,
    birth,
    phone,
    boot_type,
    consent,
    status,
    reason_cancel,
    hcode,
    guardian,
    is_delect,
    village,
    created_at,
    updated_at,
  };

  await PersonRepository.createPerson(newPerson);
  return newPerson;
}
