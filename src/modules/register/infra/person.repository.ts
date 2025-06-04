import { db } from '@/db';
import {
  persons,
  address_code,
  medical_history,
  guardians,
  address,
  title_normalize,
  relationship,
  inscl_normalize,
} from '@/db/schema';
import type {
  PersonDTO,
  MedicalHistoryDTO,
  GuardianDTO,
  FormAddressDTO,
  AddressDTO,
  NewRegisterFormDTO,
  PersonViewDTO,
  editPersonDTO,
  editGuardianDTO,
} from '../model/person.model';
import { eq, sql, desc, like, or } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import dayjs from 'dayjs';
import { count } from 'drizzle-orm';

function formatAge(birth: Date): string {
  const start = dayjs(birth);
  const end = dayjs();

  const years = end.diff(start, 'year');
  const months = end.diff(start.add(years, 'year'), 'month');
  const days = end.diff(start.add(years, 'year').add(months, 'month'), 'day');

  return `${years} ปี ${months} เดือน ${days} วัน`;
}
import { Crypto } from '@/core/crypto';
import { getRightInscl } from '../usecase/get-right';

export const PersonRepository = {
  async registerFrom(form: NewRegisterFormDTO): Promise<NewRegisterFormDTO> {
    const med_id = randomUUID();
    const person_id = randomUUID();
    const inscal = await getRightInscl(form.idcard);
    const med: MedicalHistoryDTO = {
      med_id: med_id,
      chronic_disease: form.chronic_disease,
      allergy_history: form.allergy_history,
      allergy_symptoms: form.allergy_symptoms,
      created_at: new Date(),
      updated_at: new Date(),
    };
    await db.insert(medical_history).values(med);
    let hn = '';
    let calHn = 0;
    const lastHNRow = await db
      .select({ hn: persons.hn })
      .from(persons)
      .where(like(persons.hn, 'HN%'))
      .orderBy(desc(persons.hn))
      .limit(1);

    if (lastHNRow.length === 0 || !lastHNRow[0].hn) {
      hn = 'HN000001';
    } else {
      hn = lastHNRow[0].hn;
      calHn = parseInt(hn.replace('HN', ''), 10) || 0;
      calHn += 1;
      hn = `HN${calHn.toString().padStart(6, '0')}`;
    }

    const person: PersonDTO = {
      pid: person_id,
      med_id: med_id,
      hcode_cid: '',
      pid_hdc: '',
      sex: form.sex,
      idcard: Crypto.encrypt(form.idcard),
      title: form.title,
      first_name: Crypto.encrypt(form.first_name),
      last_name: Crypto.encrypt(form.last_name),
      full_name: Crypto.encrypt(form.first_name + form.last_name),
      birth: form.birth,
      blood_type: form.blood_type,
      phone: Crypto.encrypt(form.phone),
      consent: false,
      status: 'approve',
      reason_cancel: '',
      hcode: '',
      guardian: '',
      village: '',
      is_delete: false,
      hn: hn,
      email: '-',
      inscl_code: inscal,
      created_at: new Date(),
      updated_at: new Date(),
    };
    await db.insert(persons).values(person);
    form.pid = person_id;
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
      await Promise.all([
        await db.insert(address).values(address_person),
        await db
          .update(persons)
          .set({ hcode: address_id, hcode_cid: address_id })
          .where(eq(persons.pid, form.pid)),
      ]);
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
      await Promise.all([
        await db.insert(address).values(address_person),
        await db.insert(address).values(address_person2),
        await db
          .update(persons)
          .set({ hcode: address_id, hcode_cid: address2 })
          .where(eq(persons.pid, form.pid)),
      ]);
      form.address_current.hcode = address2;
      form.address_cid.hcode = address_id;
    }
    const guardian_id = randomUUID();
    if (form.type_guardian === true) {
      const hcodeA = await db
        .select({ hcode: persons.hcode })
        .from(persons)
        .where(eq(persons.pid, form.pid));
      const guardians_data: GuardianDTO = {
        guardian_id,
        idcard: Crypto.encrypt(form.guardian.idcard),
        relationships: form.guardian.relationships,
        title: form.guardian.title,
        first_name: Crypto.encrypt(form.guardian.first_name),
        last_name: Crypto.encrypt(form.guardian.last_name),
        birth: form.guardian.birth,
        phone: form.guardian.phone,
        hcode: hcodeA[0].hcode,
        created_at: new Date(),
        updated_at: new Date(),
      };
      await Promise.all([
        db.insert(guardians).values(guardians_data),
        db
          .update(persons)
          .set({ guardian: guardian_id })
          .where(eq(persons.pid, form.pid)),
      ]);
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
        .leftJoin(address_code, eq(address.villcode, address_code.addresscode))
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
        .leftJoin(address_code, eq(address.villcode, address_code.addresscode))
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
        .leftJoin(address_code, eq(address.villcode, address_code.addresscode))
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
      const guardians_data: GuardianDTO = {
        guardian_id,
        idcard: Crypto.encrypt(form.guardian.idcard),
        relationships: form.guardian.relationships,
        title: form.guardian.title,
        first_name: Crypto.encrypt(form.guardian.first_name),
        last_name: Crypto.encrypt(form.guardian.last_name),
        birth: form.guardian.birth,
        phone: Crypto.encrypt(form.guardian.phone),
        hcode: address_id,
        created_at: new Date(),
        updated_at: new Date(),
      };
      await Promise.all([
        db.insert(address).values(address_guardians),
        db.insert(guardians).values(guardians_data),
        db
          .update(persons)
          .set({ guardian: guardian_id })
          .where(eq(persons.pid, form.pid)),
      ]);
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
        .leftJoin(address_code, eq(address.villcode, address_code.addresscode))
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
        .leftJoin(address_code, eq(address.villcode, address_code.addresscode))
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
        .leftJoin(address_code, eq(address.villcode, address_code.addresscode))
        .where(eq(address.hcode, form.guardian.hcode));
      form.address_current_string = fullAddressCurrent[0].fullAddress;
      form.address_cid_string = fullAddressCid[0].fullAddress;
      form.address_guardian_string = fullGuardian[0].fullAddress;
    }

    return form;
  },
  async findsPersonAll(
    search: string,
    page: number = 1,
    limit: number = 5
  ): Promise<{ data: PersonDTO[]; totalItems: number }> {
    const offset = (page - 1) * limit;

    const allRows = await db
      .select()
      .from(persons)
      .leftJoin(title_normalize, eq(persons.title, title_normalize.title_id));

    const decrypted = allRows.map((row) => ({
      row,
      decryptedIdcard: Crypto.decrypt(row.person.idcard),
      decryptedFirstName: Crypto.decrypt(row.person.first_name).toLowerCase(),
      decryptedLastName: Crypto.decrypt(row.person.last_name).toLowerCase(),
      decryptedFullName: row.person.full_name
        ? Crypto.decrypt(row.person.full_name).toLowerCase()
        : '',
    }));

    const filtered = search
      ? decrypted.filter(
          (entry) =>
            entry.decryptedIdcard.includes(search) ||
            entry.decryptedFirstName.includes(search.toLowerCase()) ||
            entry.decryptedLastName.includes(search.toLowerCase()) ||
            entry.decryptedFullName.includes(search.toLowerCase())
        )
      : decrypted;

    const paginated = filtered.slice(offset, offset + limit);

    const data = paginated.map((entry) => ({
      pid: entry.row.person.pid,
      hn: entry.row.person.hn,
      idcard: entry.decryptedIdcard,
      first_name: entry.decryptedFirstName,
      last_name: entry.decryptedLastName,
      title: entry.row.title_normalize?.title_th ?? entry.row.person.title,
      birth: entry.row.person.birth,
      age: formatAge(entry.row.person.birth),
      phone: Crypto.decrypt(entry.row.person.phone),
      consent: entry.row.person.consent,
    }));

    return {
      data,
      totalItems: filtered.length,
    };
  },
  async countAllPersons(): Promise<number> {
    const result = await db.select({ count: count() }).from(persons);

    return result?.[0]?.count ?? 0;
  },
  async findPersonID(pid: string): Promise<PersonViewDTO[] | null> {
    const resultID = await db
      .select({
        pid: persons.pid,
        med_id: persons.med_id,
        hcode_cid: persons.hcode_cid,
        sex: persons.sex,
        idcard: persons.idcard,
        title: persons.title,
        first_name: persons.first_name,
        last_name: persons.last_name,
        birth: persons.birth,
        phone: persons.phone,
        boot_type: persons.blood_type,
        consent: persons.consent,
        status: persons.status,
        hcode: persons.hcode,
        guardian: persons.guardian,
        inscl_code: persons.inscl_code,
        village: persons.village,
        email: persons.email,
        hn: persons.hn,
        //
        guardian_id: guardians.guardian_id,
        relationships: guardians.relationships,
        gid: guardians.idcard,
        pname: guardians.title,
        fname: guardians.first_name,
        lname: guardians.last_name,
        birth_day: guardians.birth,
        phone_number: guardians.phone,
        address_code: guardians.hcode,
        //
        title_th: title_normalize.title_th,
        //
        chronic_disease: medical_history.chronic_disease,
        allergy_history: medical_history.allergy_history,
        allergy_symptoms: medical_history.allergy_symptoms,
        //
        relationship_th: relationship.relationship_th,
        //
        moo: address.moo,
        street: address.street,
        //
        subdistname: address_code.subdistname,
        distname: address_code.distname,
        provname: address_code.provname,
        inscl: inscl_normalize.insclNameTh,
        fullAddress: sql<string>`CONCAT_WS(
          ' ',
          ${address.hno},
          ${address.street},
          CONCAT('หมู่', ${address.moo}),
          ${address_code.subdistname},
          ${address_code.distname},
          ${address_code.provname}
        )`.as('fullAddress'),
      })
      .from(persons)
      .leftJoin(title_normalize, eq(persons.title, title_normalize.title_id))
      .leftJoin(medical_history, eq(persons.med_id, medical_history.med_id))
      .leftJoin(address, eq(persons.hcode, address.hcode))
      .leftJoin(address_code, eq(address.villcode, address_code.addresscode))
      .leftJoin(guardians, eq(persons.guardian, guardians.guardian_id))
      .leftJoin(
        relationship,
        eq(guardians.relationships, relationship.relationship_id)
      )
      .leftJoin(
        inscl_normalize,
        eq(persons.inscl_code, inscl_normalize.insclCode)
      )
      .where(eq(persons.pid, pid));

    if (resultID.length === 0) return null;

    return resultID.map((row) => ({
      pid: row.pid,
      sex: row.sex === 'M' ? 'ชาย' : 'หญิง',
      idcard: Crypto.decrypt(row.idcard),
      first_name: Crypto.decrypt(row.first_name),
      last_name: Crypto.decrypt(row.last_name),
      title: row.title_th ?? row.title,
      birth: row.birth.toISOString().split('T')[0],
      age: formatAge(row.birth),
      blood_type: row.boot_type,
      phone: row.phone ? Crypto.decrypt(row.phone) : null,
      consent: row.consent,
      inscl_code: row.inscl,
      email: row.email,
      hn: row.hn,
      medical_history: {
        chronic_disease: row.chronic_disease ?? null,
        allergy_history: row.allergy_history ?? null,
        allergy_symptoms: row.allergy_symptoms ?? null,
      },
      address: {
        street: row.street,
        moo: row.moo,
        fullAddress: row.fullAddress,
      },
      address_code: {
        subdistname: row.subdistname,
        distname: row.distname,
        provname: row.provname,
      },
      guardians: row.guardian
        ? {
            guardian_id: row.guardian_id,
            relationships: row.relationship_th,
            idcard: Crypto.decrypt(row.gid),
            title: row.title_th ?? row.pname,
            first_name: Crypto.decrypt(row.fname),
            last_name: Crypto.decrypt(row.lname),
            phone: row.phone_number,
            birth: row.birth_day?.toISOString().split('T')[0] ?? null,
            age: formatAge(row.birth_day),
            hcode: row.address_code,
            fullAddress: row.fullAddress,
          }
        : '',
    }));
  },
  async editFormPerson(person: editPersonDTO): Promise<void> {
    await db.transaction(async (tx) => {
      const updatePersonData = Object.fromEntries(
        Object.entries({
          sex: person.sex,
          title: person.title,
          first_name: person.first_name
            ? Crypto.encrypt(person.first_name)
            : '',
          last_name: person.last_name ? Crypto.encrypt(person.last_name) : '',
          birth: person.birth,
          blood_type: person.blood_type,
          phone: person.phone ? Crypto.encrypt(person.phone) : '',
        }).filter(([_, v]) => v !== '')
      );

      const updateMedHistoryData = Object.fromEntries(
        Object.entries({
          chronic_disease: person.chronic_disease,
          allergy_history: person.allergy_history,
          allergy_symptoms: person.allergy_symptoms,
        }).filter(([_, v]) => v !== '')
      );

      if (Object.keys(updatePersonData).length > 0) {
        await tx
          .update(persons)
          .set(updatePersonData)
          .where(eq(persons.pid, person.pid));
      }

      if (Object.keys(updateMedHistoryData).length > 0) {
        await tx
          .update(medical_history)
          .set(updateMedHistoryData)
          .where(eq(medical_history.med_id, person.med_id));
      }
    });
  },
  async editFormGuardian(guardian: editGuardianDTO): Promise<void> {
    await db.transaction(async (tx) => {
      const updateguardianData = Object.fromEntries(
        Object.entries({
          idcard: guardian.idcard ? Crypto.encrypt(guardian.idcard) : '',
          relationships: guardian.relationships,
          title: guardian.title,
          first_name: guardian.first_name
            ? Crypto.encrypt(guardian.first_name)
            : '',
          last_name: guardian.last_name
            ? Crypto.encrypt(guardian.last_name)
            : '',
          birth: guardian.birth,
          phone: guardian.phone ? Crypto.encrypt(guardian.phone) : '',
        }).filter(([_, v]) => v !== '')
      );

      if (!guardian.guardian_id) {
        throw new Error('guardian_id is required');
      }

      const updateAddressData = Object.fromEntries(
        Object.entries({
          hno: guardian.hno,
          moo: guardian.moo,
          street: guardian.street,
          villcode: guardian.villcode,
        }).filter(([_, v]) => v !== '')
      );

      if (Object.keys(updateguardianData).length > 0) {
        await tx
          .update(guardians)
          .set(updateguardianData)
          .where(eq(guardians.guardian_id, guardian.guardian_id));
      }

      if (Object.keys(updateAddressData).length > 0) {
        await tx
          .update(address)
          .set(updateAddressData)
          .where(eq(address.hcode, guardian.hcode));
      }
    });
  },
  async editFormAddress(editaddress: FormAddressDTO): Promise<void> {
    const whereHcode = editaddress.hcode ?? editaddress.hcode_cid;

    const updateData = Object.fromEntries(
      Object.entries({
        hno: editaddress.hno,
        moo: editaddress.moo,
        street: editaddress.street,
        villcode: editaddress.villcode,
        hcode: editaddress.hcode,
      }).filter(([_, v]) => v !== '')
    );

    await db
      .update(address)
      .set(updateData)
      .where(eq(address.hcode, whereHcode));
  },
};
