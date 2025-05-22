import { db } from '@/db';
import {
  persons,
  address_code,
  medical_history,
  guardians,
  address,
} from '@/db/schema';
import type {
  PersonDTO,
  Address_codeDTO,
  MedicalHistoryDTO,
  GuardianDTO,
  RegisterFormDTO,
  AddressDTO,
} from '../model/person.model';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

export const PersonRepository = {
  async createPerson(person: PersonDTO): Promise<void> {
    await db.insert(persons).values(person);
  },
  async finds(): Promise<PersonDTO[] | null> {
    const result = await db.select().from(persons);
    return result || null;
  },
  async createMedical(medical: MedicalHistoryDTO): Promise<void> {
    await db.insert(medical_history).values(medical);
  },
  async insertManyAddressCodes(data: Address_codeDTO[]) {
    await db.insert(address_code).values(data);
  },
  async createGuardian(guardian: GuardianDTO): Promise<void> {
    await db.insert(guardians).values(guardian);
  },
  async registerFrom(form: RegisterFormDTO): Promise<RegisterFormDTO> {
    if (form.pid === '') {
      const med_id = randomUUID();
      const person_id = randomUUID();
      const med: MedicalHistoryDTO = {
        med_id: med_id,
        chronic_disease: form.chronic_disease,
        allergy_history: form.allergy_history,
        allergy_symptoms: form.allergy_symptoms,
        created_at: new Date(),
        updated_at: new Date(),
      };
      await PersonRepository.createMedical(med);

      const person: PersonDTO = {
        pid: person_id,
        med_id: med_id,
        hcode_cid: '',
        pid_hdc: '',
        sex: form.sex,
        idcard: form.idcard,
        title: form.title,
        first_name: form.first_name,
        last_name: form.last_name,
        birth: form.birth,
        boot_type: form.boot_type,
        phone: form.phone,
        consent: false,
        status: 'approve',
        reason_cancel: '',
        hcode: form.hcode,
        guardian: '',
        village: '',
        is_delete: false,
        created_at: new Date(),
        updated_at: new Date(),
      };
      await PersonRepository.createPerson(person);

      form.pid = person_id;
    }

    if (form.address_cid.villcode === '' && form.address_cid.villcode === '') {
      if (form.type_card === true) {
        const address = randomUUID();
        const address_person: AddressDTO = {
          hcode: address,
          hno: form.address_cid.hno,
          hcode_hdc: '',
          village: '',
          street: form.address_cid.street,
          moo: form.address_cid.moo,
          villcode: form.address_cid.villcode,
          created_at: new Date(),
          updated_at: new Date(),
        };
        await db.insert(address).values(address_person);
        await db
          .update(persons)
          .set({ hcode: address, hcode_cid: address })
          .where(eq((persons.pid = form.pid)));
      } else {
        const address = randomUUID();
        const address_person: AddressDTO = {
          hcode: address,
          hno: form.address_cid.hno,
          hcode_hdc: '',
          village: '',
          street: form.address_cid.street,
          moo: form.address_cid.moo,
          villcode: form.address_cid.villcode,
          created_at: new Date(),
          updated_at: new Date(),
        };
        await db.insert(address).values(address_person);
        const address2 = randomUUID();
        const address_person2: AddressDTO = {
          hcode: address2,
          hno: form.address_current.hno,
          hcode_hdc: '',
          village: '',
          street: form.address_current.street,
          moo: form.address_current.moo,
          villcode: form.address_current.villcode,
          created_at: new Date(),
          updated_at: new Date(),
        };
        await db.insert(address).values(address_person2);
        await db
          .update(persons)
          .set({ hcode: address2, hcode_cid: address })
          .where(eq((persons.pid = form.pid)));
      }
    }

    if (form.guardian.idcard === '') {
      const guardian_id = randomUUID();
      if (form.type_guardian === true) {
        db.select({hcode: users.hcode}).from(persons).where()
      }
    }

    // await db.select().from(persons).where(eq(persons.pid, form.pid));
    return form;
  },
};
