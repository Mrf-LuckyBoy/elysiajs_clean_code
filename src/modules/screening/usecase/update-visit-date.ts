import { ScreeningRepository } from "../infra/screening.repository";
import { UpdateVisitDateRequestDTO } from "../model/screening.model";

export async function updateVisitDate(visit_id: string, data: UpdateVisitDateRequestDTO): Promise<void> {
    const existingForm = await ScreeningRepository.getScreeningByVisitID(visit_id);
    if (!existingForm) {
      throw new Error('Screening form not found');
    }

    const updateData: UpdateVisitDateRequestDTO = {
    visit_date: data.visit_date,
    change_visit_date_reason: data.change_visit_date_reason,
    updated_at: new Date()
  };

    await ScreeningRepository.updateVisitDate(visit_id, updateData);
    return;
}