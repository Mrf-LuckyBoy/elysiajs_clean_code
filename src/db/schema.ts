import { mysqlTable, varchar, timestamp, unique, boolean, datetime, int } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const user_provider = mysqlTable(
  'user_provider',
  {
    user_id: varchar('user_id', { length: 36 }).primaryKey().notNull(),
    cid_hash: varchar('cid_hash', { length: 255 }).notNull(),
    hos_code: varchar('hos_code', { length: 10 }).notNull(),
    hos_name: varchar('hos_name', { length: 255 }),
    title: varchar('title', { length: 255 }),
    fname: varchar('fname', { length: 255 }),
    lname: varchar('lname', { length: 255 }),
    position: varchar('position', { length: 255 }).notNull(),
    hno: varchar('hno', { length: 20 }),
    soi_road: varchar('soi_road', { length: 20 }),
    province: varchar('province', { length: 20 }),
    district: varchar('district', { length: 20 }),
    sub_district: varchar('sub_district', { length: 20 }),
    createAt: timestamp('createAt', { mode: 'date' }),
    updateAt: timestamp('updateAt', { mode: 'date' }),
  },
  (t) => [unique('custom_unique').on(t.cid_hash, t.hos_code)]
);

export const user_provider_vhv = mysqlTable(
  'user_provider_vhv',
  {
    user_id: varchar('user_id', { length: 36 }).primaryKey().notNull(),
    cid_hash: varchar('cid_hash', { length: 255 }).notNull(),
    hos_code: varchar('hos_code', { length: 10 }).notNull(),
    hos_name: varchar('hos_name', { length: 255 }),
    title: varchar('title', { length: 255 }),
    fname: varchar('fname', { length: 255 }),
    lname: varchar('lname', { length: 255 }),
    position: varchar('position', { length: 255 }).notNull(),
    hno: varchar('hno', { length: 20 }),
    soi_road: varchar('soi_road', { length: 20 }),
    province: varchar('province', { length: 20 }),
    district: varchar('district', { length: 20 }),
    sub_district: varchar('sub_district', { length: 20 }),
    createAt: timestamp('createAt', { mode: 'date' }),
    updateAt: timestamp('updateAt', { mode: 'date' }),
  },
  (t) => [unique('custom_unique').on(t.cid_hash, t.hos_code)]
);

export const screenings = mysqlTable(
  'screenings',
  {
    visit_id : varchar('visit_id', { length: 36 }).primaryKey().notNull(),
    patient_id : varchar('patient_id', { length: 36 }).notNull(),
    visit_date : timestamp('visit_date', { mode: 'date' }).notNull(),
    reason_appointment : varchar('reason_appointment', { length: 255 }).notNull(),
    doctor_id : varchar('doctor_id', { length: 36 }).notNull(),
    assign_id : varchar('assign_id', { length: 36 }),
    assign_vhv_village_id : varchar('assign_vhv_village_id', { length: 36 }),
    assign_vhv_service_unit : varchar('assign_vhv_service_unit', { length: 36 }),
    screening_form_id : varchar('screening_form_id', { length: 36 }).notNull(),
    status_screening : varchar('status_screening', { length: 255 }).notNull(),
    is_self : boolean('is_self').notNull(),
    is_assign_official : boolean('is_assign_official').notNull(),
    is_assign_vhv : boolean('is_assign_vhv').notNull(),
    is_assign_vhv_village : boolean('is_assign_vhv_village').notNull(),
    is_assign_vhv_service_unit : boolean('is_assign_vhv_service_unit').notNull(),
    is_diagnosis : boolean('is_diagnosis').notNull(),
    createAt: timestamp('createAt', { mode: 'date' }),
    updateAt: timestamp('updateAt', { mode: 'date' }),
  },
  (t) => [unique('custom_unique').on(t.visit_id)]
);

export const screening_form = mysqlTable(
  'screening_form',
  {
    screening_form_id : varchar('screening_form_id', { length: 36 }).primaryKey().notNull(),
    consent_by : varchar('consent_by', { length: 255 }).notNull(),
    is_alone: boolean('is_alone').notNull(),
    social_1: boolean('social_1').notNull(),
    social_2: boolean('social_2').notNull(),
    social_3: boolean('social_3').notNull(),
    elderly_1_1: boolean('elderly_1_1').notNull(),
    elderly_1_2: boolean('elderly_1_2').notNull(),
    elderly_2_1: boolean('elderly_2_1').notNull(),
    elderly_2_2: boolean('elderly_2_2').notNull(),
    elderly_3 : boolean('elderly_3').notNull(),
    elderly_4 : boolean('elderly_4').notNull(),
    elderly_5_1 : boolean('elderly_5_1').notNull(),
    elderly_5_2 : boolean('elderly_5_2').notNull(),
    elderly_6 : boolean('elderly_6').notNull(),
    elderly_7 : boolean('elderly_7').notNull(),
    elderly_8_1 : boolean('elderly_8_1').notNull(),
    elderly_8_2 : boolean('elderly_8_2').notNull(),
    elderly_9 : boolean('elderly_9').notNull(),
    elderly_sum : varchar('elderly_sum', { length: 1 }).notNull(),
    visit_screening : datetime('visit_screening', { mode: 'date' }).notNull(),
    image_id : varchar('image_id', { length: 255 }).notNull(),
    word_recall : int('word_recall').notNull(),
    clock_draw : int('clock_draw').notNull(),
    sum_mini_cog : int('sum_mini_cog').notNull(),
    createAt: timestamp('createAt', { mode: 'date' }),
    updateAt: timestamp('updateAt', { mode: 'date' }),
  }
);
