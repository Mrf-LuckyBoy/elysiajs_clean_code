import { db } from "@/db";
import { UpdateScreeningFormDTO } from "../model/screening.model";
import { screening_form, screenings } from "@/db/schema";
import { eq } from 'drizzle-orm';

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
  }
  };

