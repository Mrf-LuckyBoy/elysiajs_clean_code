import { ScreeningRepository } from "../infra/screening.repository";
import { UpdateVisitDateRequestDTO } from "../model/screening.model";

export async function updateVisitDate(visit_id: string, data: UpdateVisitDateRequestDTO): Promise<void> {
    const existingForm = await ScreeningRepository.getScreeningByVisitID(visit_id);
    if (!existingForm) {
      throw new Error('Screening form not found');
    }

    const updateData: UpdateVisitDateRequestDTO = {
    visit_date: data.visit_date,
    reason_edit: data.reason_edit,
    updated_at: new Date()
  };

    await ScreeningRepository.updateVisitDate(visit_id, updateData);
    return;
}