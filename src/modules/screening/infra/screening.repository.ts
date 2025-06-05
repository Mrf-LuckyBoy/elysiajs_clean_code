import { db } from '@/db';
import {
  GetScreeningFormDetailsDTO,
  SqlScreeningByVisitIDResponse,
  SqlScreeningResponse,
  UpdateScreeningFormDTO,
  UpdateVisitDateRequestDTO,
} from '../model/screening.model';
import {
  address,
  address_code,
  inscl_normalize,
  persons,
  screening_form,
  screenings,
  title_normalize,
  user_provider,
  user_provider_vhv,
} from '@/db/schema';
import { eq, sql, and } from 'drizzle-orm';
import { alias } from 'drizzle-orm/mysql-core';

export type InsertScreening = typeof screenings.$inferInsert;
export type SelectScreening = typeof screenings.$inferSelect;

export type InsertScreeningForm = typeof screening_form.$inferInsert;
export type SelectScreeningForm = typeof screening_form.$inferSelect;

export const ScreeningRepository = {
  async create(
    screeningData: InsertScreening,
    screeningFormData: InsertScreeningForm
  ): Promise<{
    success: boolean;
    message: string;
    visit_id: string;
    createdScreeningFormId: string;
  }> {
    const result = await db.transaction(async (tx) => {
      try {
        await tx.insert(screening_form).values(screeningFormData);
      } catch (formInsertError: unknown) {
        console.error('failed to insert into screening_form:', formInsertError);
        const errorMessage = formInsertError instanceof Error ? formInsertError.message : 'Unknown error';
        throw new Error(`Failed to create screening form: ${errorMessage}`);
      }
      try {
        await tx.insert(screenings).values(screeningData);
      } catch (screeningInsertError: unknown) {
        console.error('failed to insert into screenings:', screeningInsertError);
        const errorMessage = screeningInsertError instanceof Error ? screeningInsertError.message : 'Unknown error';
        throw new Error(`Failed to create screening: ${errorMessage}`);
      }
      return {
        success: true,
        message: 'Screening and form created successfully',
        visit_id: screeningData.visit_id,
        createdScreeningFormId: screeningFormData.screening_form_id,
      };
    });
    return result;
  },
  async findScreeningFormById(formID: string): Promise<boolean> {
    const result = await db.select().from(screening_form).where(eq(screening_form.screening_form_id, formID));

    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  },
  async updateScreeningForm(formID: string, data: UpdateScreeningFormDTO): Promise<void> {
    await db.update(screening_form).set(data).where(eq(screening_form.screening_form_id, formID));
  },
  async updateScreeningStatus(formID: string, status: string): Promise<void> {
    await db
      .update(screenings)
      .set({ status_screening: status, updated_at: new Date() })
      .where(eq(screenings.screening_form_id, formID));
  },
  async getScreeningFormDetails(formID: string): Promise<GetScreeningFormDetailsDTO | null> {
    const result = await db
      .select({
        screening_form_id: screening_form.screening_form_id,
        sex: persons.sex,
        cid: persons.idcard,
        title: sql<string>`COALESCE(${title_normalize.title_th}, '')`,
        first_name: persons.first_name,
        last_name: persons.last_name,
        //address
        is_alone: screening_form.is_alone,
        hno: address.hno,
        moo: address.moo,
        soi_road: address.street,
        province: address_code.provname,
        district: address_code.distname,
        sub_district: address_code.subdistname,
        postal_code: address_code.zipcode,
        //social
        social_1: screening_form.social_1,
        social_2: screening_form.social_2,
        social_3: screening_form.social_3,
        //elderly
        elderly_1_1: screening_form.elderly_1_1,
        elderly_1_2: screening_form.elderly_1_2,
        elderly_2_1: screening_form.elderly_2_1,
        elderly_2_2: screening_form.elderly_2_2,
        elderly_3: screening_form.elderly_3,
        elderly_4: screening_form.elderly_4,
        elderly_5_1: screening_form.elderly_5_1,
        elderly_5_2: screening_form.elderly_5_2,
        elderly_6: screening_form.elderly_6,
        elderly_7: screening_form.elderly_7,
        elderly_8_1: screening_form.elderly_8_1,
        elderly_8_2: screening_form.elderly_8_2,
        elderly_9: screening_form.elderly_9,
        elderly_sum: screening_form.elderly_sum,
        //sum minicog
        visit_screening: screening_form.visit_screening,
        image_id: screening_form.image_id,
        word_recall: screening_form.word_recall,
        clock_draw: screening_form.clock_draw,
        sum_mini_cog: screening_form.sum_mini_cog,
      })
      .from(screening_form)
      .leftJoin(screenings, eq(screening_form.screening_form_id, screenings.screening_form_id))
      .innerJoin(persons, eq(persons.pid, screenings.patient_id))
      .leftJoin(title_normalize, eq(title_normalize.title_id, persons.title))
      .leftJoin(address, eq(address.hcode, persons.hcode))
      .leftJoin(address_code, eq(address.villcode, address_code.addresscode))
      .where(eq(screening_form.screening_form_id, formID))
      .limit(1);
    return result[0] || null;
  },
  async getScreeningList(hosCode: string): Promise<SqlScreeningResponse[]> {
    const result = await db
      .select({
        visit_id: screenings.visit_id,
        visit_date: screenings.visit_date,
        person_id: persons.pid,
        person_title: title_normalize.title_th,
        person_fname: persons.first_name,
        person_lname: persons.last_name,
        provider_title: user_provider.title,
        provider_fname: user_provider.fname,
        provider_lname: user_provider.lname,
        inscl_code: inscl_normalize.insclCode,
        inscl_name: inscl_normalize.insclNameTh,
        id_card: persons.idcard,
        status_screening: screenings.status_screening,
        role: user_provider.position,
        screening_form_id: screenings.screening_form_id,
      })
      .from(screenings)
      .leftJoin(persons, eq(persons.pid, screenings.patient_id))
      .leftJoin(user_provider, eq(user_provider.user_id, screenings.doctor_id))
      .leftJoin(title_normalize, eq(title_normalize.title_id, persons.title))
      .leftJoin(inscl_normalize, eq(inscl_normalize.insclCode, persons.inscl_code))
      .where(eq(user_provider.hos_code, hosCode));
    return result;
  },
  async findScreeningByVisitID(visitID: string, hosCode: string): Promise<SqlScreeningByVisitIDResponse | null> {
    const vhvAssign = alias(user_provider_vhv, 'vhv_assign');
    const officialAssign = alias(user_provider, 'official_assign');
    const result = await db
      .select({
        visit_id: screenings.visit_id,
        visit_date: screenings.visit_date,
        person_id: persons.pid,
        hn: persons.hn,
        sex: persons.sex,
        age: persons.birth,
        person_cid: persons.idcard,
        person_title: title_normalize.title_th,
        person_fname: persons.first_name,
        person_lname: persons.last_name,
        reason_edit: screenings.reason_edit,
        appointment_reason: screenings.reason_appointment,
        provider_title: user_provider.title,
        provider_fname: user_provider.fname,
        provider_lname: user_provider.lname,
        screening_form_id: screenings.screening_form_id,
        assign_id: screenings.assign_id,
        assign_id_vhv: screenings.assign_id_vhv,
        is_self: screenings.is_self,
        is_assign_official: screenings.is_assign_official,
        is_assign_vhv: screenings.is_assign_vhv,
        is_assign_vhv_service_unit: screenings.is_assign_vhv_service_unit,
        is_assgin_official_service_unit: screenings.is_assgin_official_service_unit,
        assign_fname: sql<string>`CASE
        WHEN ${screenings.assign_id_vhv} IS NOT NULL THEN
          COALESCE(vhv_assign.fname, '')
        WHEN ${screenings.assign_id} IS NOT NULL THEN
          COALESCE(official_assign.fname, '')
        ELSE NULL
      END`,
        assign_lname: sql<string>`CASE
        WHEN ${screenings.assign_id_vhv} IS NOT NULL THEN
          COALESCE(vhv_assign.lname, '')
        WHEN ${screenings.assign_id} IS NOT NULL THEN
          COALESCE(official_assign.lname, '')
        ELSE NULL
      END`,
        address: sql<string>`CONCAT(
        COALESCE(${address.hno}, ''), ' ',
        COALESCE(${address.village}, ''), ' ',
        'หมู่ที่ ', COALESCE(${address.moo}, '-'), ' ',
        'ถนน ', COALESCE(${address.street}, ''), ' ',
        COALESCE(${address_code.subdistname}, ''), ' ',
        COALESCE(${address_code.distname}, ''), ' ',
        COALESCE(${address_code.provname}, '')
      )`,
      })
      .from(screenings)
      .leftJoin(persons, eq(persons.pid, screenings.patient_id))
      .leftJoin(user_provider, eq(user_provider.user_id, screenings.doctor_id))
      .leftJoin(title_normalize, eq(title_normalize.title_id, persons.title))
      //ที่อยู่
      .leftJoin(address, eq(persons.hcode, address.hcode))
      .leftJoin(address_code, eq(address.villcode, address_code.addresscode))
      .leftJoin(vhvAssign, eq(vhvAssign.user_id, screenings.assign_id_vhv))
      .leftJoin(officialAssign, eq(officialAssign.user_id, screenings.assign_id))

      .where(and(eq(screenings.visit_id, visitID), eq(user_provider.hos_code, hosCode)))
      .limit(1);

    return result[0] || null;
  },
  async getScreeningByVisitID(visitID: string): Promise<boolean> {
    const result = await db.select().from(screenings).where(eq(screenings.visit_id, visitID));
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  },
  async updateVisitDate(visit_id: string, data: UpdateVisitDateRequestDTO): Promise<void> {
    await db.update(screenings).set(data).where(eq(screenings.visit_id, visit_id));
  },
};
