import data from '@/mockdata/form.json';
import { ElderlySectionDTO, MockupData } from '../model/screening.model';
export const getScreeningFormJson = (form: ElderlySectionDTO): MockupData => {
  const newData = JSON.parse(JSON.stringify(data));
  // ด้านการเคลื่อนไหวร่างกาย
  if (form.elderly_1_1 === true) {
    newData.data[0].question[0].answer[0].value = '1';
    newData.data[0].question[0].answer[1].value = '0';
  } else {
    newData.data[0].question[0].answer[0].value = '0';
    newData.data[0].question[0].answer[1].value = '1';
  }

  if (form.elderly_1_2 === true) {
    newData.data[0].question[1].answer[0].value = '1';
    newData.data[0].question[1].answer[1].value = '0';
  } else {
    newData.data[0].question[1].answer[0].value = '0';
    newData.data[0].question[1].answer[1].value = '1';
  }

  // ด้านการขาดสารอาหาร
  if (form.elderly_2_1 === true) {
    newData.data[1].question[0].answer[0].value = '1';
    newData.data[1].question[0].answer[1].value = '0';
  } else {
    newData.data[1].question[0].answer[0].value = '0';
    newData.data[1].question[0].answer[1].value = '1';
  }
  if (form.elderly_2_2 === true) {
    newData.data[1].question[1].answer[0].value = '1';
    newData.data[1].question[1].answer[1].value = '0';
  } else {
    newData.data[1].question[1].answer[0].value = '0';
    newData.data[1].question[1].answer[1].value = '1';
  }
  // ด้านการมองเห็น
  if (form.elderly_3 === true) {
    newData.data[2].question[0].answer[0].value = '1';
    newData.data[2].question[0].answer[1].value = '0';
  } else {
    newData.data[2].question[0].answer[0].value = '0';
    newData.data[2].question[0].answer[1].value = '1';
  }
  //   ด้านการได้ยิน
  if (form.elderly_4 === true) {
    newData.data[3].question[0].answer[0].value = '1';
    newData.data[3].question[0].answer[1].value = '0';
  } else {
    newData.data[3].question[0].answer[0].value = '0';
    newData.data[3].question[0].answer[1].value = '1';
  }
  //   ด้านภาวะซึมเศร้า
  if (form.elderly_5_1 === true) {
    newData.data[4].question[0].answer[0].value = '1';
    newData.data[4].question[0].answer[1].value = '0';
  } else {
    newData.data[4].question[0].answer[0].value = '0';
    newData.data[4].question[0].answer[1].value = '1';
  }
  if (form.elderly_5_2 === true) {
    newData.data[4].question[1].answer[0].value = '1';
    newData.data[4].question[1].answer[1].value = '0';
  } else {
    newData.data[4].question[1].answer[0].value = '0';
    newData.data[4].question[1].answer[1].value = '1';
  }
  // ด้านการกลั้นปัสสาวะ
  if (form.elderly_6 === true) {
    newData.data[5].question[0].answer[0].value = '1';
    newData.data[5].question[0].answer[1].value = '0';
  } else {
    newData.data[5].question[0].answer[0].value = '0';
    newData.data[5].question[0].answer[1].value = '1';
  }
  // ด้านการปฏิบัติกิจวัตรประจำวัน
  if (form.elderly_7 === true) {
    newData.data[6].question[0].answer[0].value = '1';
    newData.data[6].question[0].answer[1].value = '0';
  } else {
    newData.data[6].question[0].answer[0].value = '0';
    newData.data[6].question[0].answer[1].value = '1';
  }
  // ช่องปาก
  if (form.elderly_8_1 === true) {
    newData.data[7].question[0].answer[0].value = '1';
    newData.data[7].question[0].answer[1].value = '0';
  } else {
    newData.data[7].question[0].answer[0].value = '0';
    newData.data[7].question[0].answer[1].value = '1';
  }
  // เจ็บปวดในช่องปาก
  if (form.elderly_8_2 === true) {
    newData.data[7].question[1].answer[0].value = '1';
    newData.data[7].question[1].answer[1].value = '0';
  } else {
    newData.data[7].question[1].answer[0].value = '0';
    newData.data[7].question[1].answer[1].value = '1';
  }
  //   ด้านความคิดความจำ
  if (form.elderly_9 === true) {
    newData.data[8].question[0].answer[0].value = '1';
    newData.data[8].question[0].answer[1].value = '0';
  } else {
    newData.data[8].question[0].answer[0].value = '0';
    newData.data[8].question[0].answer[1].value = '1';
  }
  return {
    MOCKUPDATA: newData.data,
    elderly_sum: form.elderly_sum || '0',
  };
};
