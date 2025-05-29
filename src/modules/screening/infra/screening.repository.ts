import { db } from "@/db";
import { SqlScreeningByVisitIDResponse, SqlScreeningResponse, UpdateScreeningFormDTO } from "../model/screening.model";
import { address, address_code, inscl_normalize, persons, screening_form, screenings, title_normalize, user_provider } from "@/db/schema";
import { eq, is } from 'drizzle-orm';
import { time } from "drizzle-orm/mysql-core";

export type InsertScreening = typeof screenings.$inferInsert;
export type SelectScreening = typeof screenings.$inferSelect;

export type InsertScreeningForm = typeof screening_form.$inferInsert;
export type SelectScreeningForm = typeof screening_form.$inferSelect;

export const ScreeningRepository = {
  async create(screeningData: InsertScreening,
    screeningFormData: InsertScreeningForm
  ): Promise<{ success: boolean; message: string; visit_id: string; createdScreeningFormId: string }> {
    const result = await db.transaction(async (tx) => {
      try {
        await tx.insert(screening_form).values(screeningFormData);
      } catch (formInsertError: any) {
                console.error("ScreeningRepository: Failed to insert into screening_form:", formInsertError);
        throw new Error(`Failed to create screening form: ${formInsertError.message || 'Unknown error'}`);
      }
  try {
        await tx.insert(screenings).values(screeningData);
      } catch (screeningInsertError: any) {
        console.error("ScreeningRepository: Failed to insert into screenings:", screeningInsertError);
        throw new Error(`Failed to create screening: ${screeningInsertError.message || 'Unknown error'}`);
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
  async updateScreeningForm(
    formID: string, 
    data: UpdateScreeningFormDTO):
    Promise<void> {
      await db.update(screening_form).
      set(data).
      where(eq(
        screening_form.screening_form_id, 
        formID
      ));
  },
  async findScreeningList(): Promise<SqlScreeningResponse[]> {

    const result = await db.select({
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

    return result;
  },
  async findScreeningByVisitID(visitID: string): Promise<SqlScreeningByVisitIDResponse | null> {
    const result = await db.select({
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
      address: persons.hcode,
      appointment_reason: screenings.reason_appointment,
      provider_title: user_provider.title,
      provider_fname: user_provider.fname,
      provider_lname: user_provider.lname,
      screening_form_id: screenings.screening_form_id,
      is_self: screenings.is_self,
      is_assign_official: screenings.is_assign_official,
      is_assign_vhv: screenings.is_assign_vhv,
      is_assign_vhv_service_unit: screenings.is_assign_vhv_service_unit,
      is_assgin_official_service_unit: screenings.is_assgin_official_service_unit,
      is_assign_vhv_village: screenings.is_assign_vhv_village,

      //ที่อยู่
      hno: address.hno,
      moo: address.moo,
      street: address.street,
      village: address.village,
      provname: address_code.provname,
      distname: address_code.distname,
      subdistname: address_code.subdistname
    })
    .from(screenings)
    .leftJoin(persons, eq(persons.pid, screenings.patient_id))
    .leftJoin(user_provider, eq(user_provider.user_id, screenings.doctor_id))
    .leftJoin(title_normalize, eq(title_normalize.title_id, persons.title))
        //ที่อยู่
    .leftJoin(address, eq(persons.hcode, address.hcode))
    .leftJoin(address_code, eq(address.villcode, address_code.addresscode))
    .where(eq(screenings.visit_id, visitID))
    .limit(1);

    return result[0] || null;
  },
};
