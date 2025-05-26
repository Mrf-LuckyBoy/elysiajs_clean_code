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
  MedicalHistoryDTO,
  GuardianDTO,
  // RegisterFormDTO,
  AddressDTO,
  NewRegisterFormDTO,
} from '../model/person.model';
import { eq, sql } from 'drizzle-orm';
import { randomUUID } from 'crypto';

export const PersonRepository = {
  async registerFrom(form: NewRegisterFormDTO): Promise<NewRegisterFormDTO> {
    // main form 1
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
      await db.insert(medical_history).values(med);

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
        blood_type: form.blood_type,
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
      await db.insert(persons).values(person);

      form.pid = person_id;
    }
    // main form 2
    if (form.address_cid.villcode !== '' && form.address_cid.villcode !== '') {
      if (form.type_card === true) {
        const address_id = randomUUID();
        const address_person: AddressDTO = {
          hcode: address_id,
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
          .set({ hcode: address_id, hcode_cid: address_id })
          .where(eq(persons.pid, form.pid));
        form.address_current.hcode = address_id;
        form.address_cid.hcode = address_id;
        form.address_current.hno = form.address_cid.hno;
        form.address_current.street = form.address_cid.street;
        form.address_current.moo = form.address_cid.moo;
        form.address_current.villcode = form.address_cid.villcode;
      } else {
        const address_id = randomUUID();
        const address_person: AddressDTO = {
          hcode: address_id,
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
          .set({ hcode: address_id, hcode_cid: address2 })
          .where(eq(persons.pid, form.pid));
        form.address_current.hcode = address2;
        form.address_cid.hcode = address_id;
      }
    }
    // main form 3
    if (form.guardian.idcard !== '') {
      const guardian_id = randomUUID();
      if (form.type_guardian === true) {
        const hcodeA = await db
          .select({ hcode: persons.hcode })
          .from(persons)
          .where(eq(persons.pid, form.pid));
        const guardians_data: GuardianDTO = {
          guardian_id,
          idcard: form.guardian.idcard,
          relationships: form.guardian.relationships,
          title: form.guardian.title,
          first_name: form.guardian.first_name,
          last_name: form.guardian.last_name,
          birth: form.guardian.birth,
          phone: form.guardian.phone,
          hcode: hcodeA[0].hcode,
          created_at: new Date(),
          updated_at: new Date(),
        };
        await db.insert(guardians).values(guardians_data);
        form.guardian.hcode = hcodeA[0].hcode;
        const fullAddressCurrent: {
          fullAddress: string;
        }[] = await db
          .select({
            fullAddress:
              sql<string>`CONCAT(${address.hno}, ' ', ${address.street}, ' ', ${address_code.subdistname}, ' ', ${address_code.distname}, ' ', ${address_code.provname})`.as(
                'fullAddress'
              ),
          })
          .from(address)
          .leftJoin(
            address_code,
            eq(address.villcode, address_code.addresscode)
          )
          .where(eq(address.hcode, form.address_current.hcode));
        const fullAddressCid: {
          fullAddress: string;
        }[] = await db
          .select({
            fullAddress:
              sql<string>`CONCAT(${address.hno}, ' ', ${address.street}, ' ', ${address_code.subdistname}, ' ', ${address_code.distname}, ' ', ${address_code.provname})`.as(
                'fullAddress'
              ),
          })
          .from(address)
          .leftJoin(
            address_code,
            eq(address.villcode, address_code.addresscode)
          )
          .where(eq(address.hcode, form.address_cid.hcode));
        const fullGuardian: {
          fullAddress: string;
        }[] = await db
          .select({
            fullAddress:
              sql<string>`CONCAT(${address.hno}, ' ', ${address.street}, ' ', ${address_code.subdistname}, ' ', ${address_code.distname}, ' ', ${address_code.provname})`.as(
                'fullAddress'
              ),
          })
          .from(address)
          .leftJoin(
            address_code,
            eq(address.villcode, address_code.addresscode)
          )
          .where(eq(address.hcode, form.guardian.hcode));
        form.address_current_string = fullAddressCurrent[0].fullAddress;
        form.address_cid_string = fullAddressCid[0].fullAddress;
        form.address_guardian_string = fullGuardian[0].fullAddress;
      } else {
        const address_id = randomUUID();
        const address_guardians: AddressDTO = {
          hcode: address_id,
          hno: form.guardian.hno,
          hcode_hdc: '',
          village: '',
          street: form.guardian.street,
          moo: form.guardian.moo,
          villcode: form.guardian.villcode,
          created_at: new Date(),
          updated_at: new Date(),
        };
        await db.insert(address).values(address_guardians);
        const guardians_data: GuardianDTO = {
          guardian_id,
          idcard: form.guardian.idcard,
          relationships: form.guardian.relationships,
          title: form.guardian.title,
          first_name: form.guardian.first_name,
          last_name: form.guardian.last_name,
          birth: form.guardian.birth,
          phone: form.guardian.phone,
          hcode: address_id,
          created_at: new Date(),
          updated_at: new Date(),
        };
        await db.insert(guardians).values(guardians_data);
        form.guardian.hcode = address_id;
        const fullAddressCurrent: {
          fullAddress: string;
        }[] = await db
          .select({
            fullAddress:
              sql<string>`CONCAT(${address.hno}, ' ', ${address.street}, ' ', ${address_code.subdistname}, ' ', ${address_code.distname}, ' ', ${address_code.provname})`.as(
                'fullAddress'
              ),
          })
          .from(address)
          .leftJoin(
            address_code,
            eq(address.villcode, address_code.addresscode)
          )
          .where(eq(address.hcode, form.address_current.hcode));
        const fullAddressCid: {
          fullAddress: string;
        }[] = await db
          .select({
            fullAddress:
              sql<string>`CONCAT(${address.hno}, ' ', ${address.street}, ' ', ${address_code.subdistname}, ' ', ${address_code.distname}, ' ', ${address_code.provname})`.as(
                'fullAddress'
              ),
          })
          .from(address)
          .leftJoin(
            address_code,
            eq(address.villcode, address_code.addresscode)
          )
          .where(eq(address.hcode, form.address_cid.hcode));
        const fullGuardian: {
          fullAddress: string;
        }[] = await db
          .select({
            fullAddress:
              sql<string>`CONCAT(${address.hno}, ' ', ${address.street}, ' ', ${address_code.subdistname}, ' ', ${address_code.distname}, ' ', ${address_code.provname})`.as(
                'fullAddress'
              ),
          })
          .from(address)
          .leftJoin(
            address_code,
            eq(address.villcode, address_code.addresscode)
          )
          .where(eq(address.hcode, form.guardian.hcode));
        form.address_current_string = fullAddressCurrent[0].fullAddress;
        form.address_cid_string = fullAddressCid[0].fullAddress;
        form.address_guardian_string = fullGuardian[0].fullAddress;
      }
    }
    return form;
  },
};
