import data from '@/mockdata/form.json';
import { ElderlySectionDTO, MockupData } from '../model/screening.model';
export const getScreeningFormJson = (form: ElderlySectionDTO): MockupData => {
  // ด้านการเคลื่อนไหวร่างกาย
  if (form.elderly_1_1 === true) {
    data.data[0].question[0].answer[0].value = '1';
    data.data[0].question[0].answer[1].value = '0';
  } else {
    data.data[0].question[0].answer[0].value = '0';
    data.data[0].question[0].answer[1].value = '1';
  }

  if (form.elderly_1_2 === true) {
    data.data[0].question[1].answer[0].value = '1';
    data.data[0].question[1].answer[1].value = '0';
  } else {
    data.data[0].question[1].answer[0].value = '0';
    data.data[0].question[1].answer[1].value = '1';
  }

  // ด้านการขาดสารอาหาร
  if (form.elderly_2_1 === true) {
    data.data[1].question[0].answer[0].value = '1';
    data.data[1].question[0].answer[1].value = '0';
  } else {
    data.data[1].question[0].answer[0].value = '0';
    data.data[1].question[0].answer[1].value = '1';
  }
  if (form.elderly_2_2 === true) {
    data.data[1].question[1].answer[0].value = '1';
    data.data[1].question[1].answer[1].value = '0';
  } else {
    data.data[1].question[1].answer[0].value = '0';
    data.data[1].question[1].answer[1].value = '1';
  }
  // ด้านการมองเห็น
  if (form.elderly_3 === true) {
    data.data[2].question[0].answer[0].value = '1';
    data.data[2].question[0].answer[1].value = '0';
  } else {
    data.data[2].question[0].answer[0].value = '0';
    data.data[2].question[0].answer[1].value = '1';
  }
  //   ด้านการได้ยิน
  if (form.elderly_4 === true) {
    data.data[3].question[0].answer[0].value = '1';
    data.data[3].question[0].answer[1].value = '0';
  } else {
    data.data[3].question[0].answer[0].value = '0';
    data.data[3].question[0].answer[1].value = '1';
  }
  //   ด้านภาวะซึมเศร้า
  if (form.elderly_5_1 === true) {
    data.data[4].question[0].answer[0].value = '1';
    data.data[4].question[0].answer[1].value = '0';
  } else {
    data.data[4].question[0].answer[0].value = '0';
    data.data[4].question[0].answer[1].value = '1';
  }
  if (form.elderly_5_2 === true) {
    data.data[4].question[1].answer[0].value = '1';
    data.data[4].question[1].answer[1].value = '0';
  } else {
    data.data[4].question[1].answer[0].value = '0';
    data.data[4].question[1].answer[1].value = '1';
  }
  // ด้านการกลั้นปัสสาวะ
  if (form.elderly_6 === true) {
    data.data[5].question[0].answer[0].value = '1';
    data.data[5].question[0].answer[1].value = '0';
  } else {
    data.data[5].question[0].answer[0].value = '0';
    data.data[5].question[0].answer[1].value = '1';
  }
  // ด้านการปฏิบัติกิจวัตรประจำวัน
  if (form.elderly_7 === true) {
    data.data[6].question[0].answer[0].value = '1';
    data.data[6].question[0].answer[1].value = '0';
  } else {
    data.data[6].question[0].answer[0].value = '0';
    data.data[6].question[0].answer[1].value = '1';
  }
  // ช่องปาก
  if (form.elderly_8_1 === true) {
    data.data[7].question[0].answer[0].value = '1';
    data.data[7].question[0].answer[1].value = '0';
  } else {
    data.data[7].question[0].answer[0].value = '0';
    data.data[7].question[0].answer[1].value = '1';
  }
  // เจ็บปวดในช่องปาก
  if (form.elderly_8_2 === true) {
    data.data[7].question[1].answer[0].value = '1';
    data.data[7].question[1].answer[1].value = '0';
  } else {
    data.data[7].question[1].answer[0].value = '0';
    data.data[7].question[1].answer[1].value = '1';
  }
  //   ด้านความคิดความจำ
  if (form.elderly_9 === true) {
    data.data[8].question[0].answer[0].value = '1';
    data.data[8].question[0].answer[1].value = '0';
  } else {
    data.data[8].question[0].answer[0].value = '0';
    data.data[8].question[0].answer[1].value = '1';
  }
  return {
    MOCKUPDATA: data.data,
  };
};
