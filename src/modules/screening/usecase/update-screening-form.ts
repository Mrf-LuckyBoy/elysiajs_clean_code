import { ScreeningRepository } from '../infra/screening.repository';
import { GetScreeningFormDetailsDTO, UpdateScreeningFormDTO } from '../model/screening.model';

export async function updateScreeningFormData(
  formID: string,
  data: UpdateScreeningFormDTO,
  imageID: string
): Promise<void> {
  const existingForm = await ScreeningRepository.findScreeningFormById(formID);
  if (!existingForm) {
    throw new Error('Screening form not found');
  }
  if (imageID !== '') {
    imageID = '123';
  } else {
    imageID = '';
  }

  const currentTime = new Date();
  const updateData: UpdateScreeningFormDTO = {
    ...data,
    image_id: imageID,
    updated_at: currentTime,
  };

  await ScreeningRepository.updateScreeningForm(formID, updateData);

  const formDetails = await ScreeningRepository.getScreeningFormDetails(formID);
  if (!formDetails) {
    throw new Error('Failed to retrieve updated form data');
  }

  const isComplete = checkFormCompletion(formDetails);
  const newStatus = isComplete ? 'เสร็จสิ้น' : 'บันทึกร่าง';

  await ScreeningRepository.updateScreeningStatus(formID, newStatus);
  return;
}

function checkFormCompletion(data: GetScreeningFormDetailsDTO): boolean {
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
    'elderly_sum',
    'visit_screening',
    'image_id',
    'word_recall',
    'clock_draw',
    'sum_mini_cog',
  ];

  const missingFields: string[] = [];

  for (const field of requiredFields) {
    const value = data[field as keyof GetScreeningFormDetailsDTO];
    if (value === undefined || value === null || value === '') {
      missingFields.push(field);
    }
  }

  if (missingFields.length > 0) {
    console.log('Missing fields:', missingFields);
    return false;
  }

  return true;
}

export async function uploadToMinIOImage(imageFile: File | undefined): Promise<string> {
  if (imageFile) {
    return 'imageID';
  }
  return '';
}
