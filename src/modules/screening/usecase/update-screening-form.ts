import { ScreeningRepository } from "../infra/screening.repository";
import { UpdateScreeningFormDTO } from "../model/screening.model";

export async function updateScreeningFormData(formID: string, data: UpdateScreeningFormDTO): Promise<void> {
    const existingForm = await ScreeningRepository.findScreeningFormById(formID);
    if (!existingForm) {
      throw new Error('Screening form not found');
    }
    const abnormalSum = calculateabnormalSum(data);
    const currentTime = new Date();
    const updateData: UpdateScreeningFormDTO = {
      ...data,
      elderly_sum: abnormalSum.toString(),      
      updated_at: currentTime
    };
     await ScreeningRepository.updateScreeningForm(formID, updateData);
    return;
}

function calculateabnormalSum(data: UpdateScreeningFormDTO): number {
 let sum = 0;
    
    if (data.elderly_1_1) sum++;
    if (data.elderly_1_2) sum++;
    if (data.elderly_2_1) sum++;
    if (data.elderly_2_2) sum++;
    if (data.elderly_3) sum++;
    if (data.elderly_4) sum++;
    if (data.elderly_5_1) sum++;
    if (data.elderly_5_2) sum++;
    if (data.elderly_6) sum++;
    if (data.elderly_7) sum++;
    if (data.elderly_8_1) sum++;
    if (data.elderly_8_2) sum++;
    if (data.elderly_9) sum++;

    return sum;
  }