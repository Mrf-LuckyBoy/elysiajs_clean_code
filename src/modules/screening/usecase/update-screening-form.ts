import { ScreeningRepository } from '../infra/screening.repository';
import { UpdateScreeningFormDTO } from '../model/screening.model';

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
    // sum_mini_cog:
    //   data.word_recall !== undefined && data.clock_draw !== undefined ? data.word_recall + data.clock_draw : undefined, //ให้ user คำนวนเองก่อน
    updated_at: currentTime,
  };

  const isComplete = checkFormCompletion(updateData);
  const newStatus = isComplete ? 'เสร็จสิ้น' : 'บันทึกร่าง';
  await ScreeningRepository.updateScreeningForm(formID, updateData);

  await ScreeningRepository.updateScreeningStatus(formID, newStatus);
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
  if (data.elderly_9) sum--; //ข้อนี้ถ้าตอบ true หมายถึงความคิดความจำปกติ

  return sum;
}

function checkFormCompletion(data: UpdateScreeningFormDTO): boolean {
  const requiredFields = [
    'is_alone',
    'social_1',
    'social_2',
    'social_3',
    'elderly_1_1',
    'elderly_1_2',
    'elderly_2_1',
    'elderly_2_2',
    'elderly_3',
    'elderly_4',
    'elderly_5_1',
    'elderly_5_2',
    'elderly_6',
    'elderly_7',
    'elderly_8_1',
    'elderly_8_2',
    'elderly_9',
    'visit_screening',
    'image_id',
    'word_recall',
    'clock_draw',
  ];

  for (const field of requiredFields) {
    const value = data[field as keyof UpdateScreeningFormDTO];
    if (value === undefined || value === null) {
      return false;
    }
  }

  return true;
}
