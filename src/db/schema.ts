import {
  mysqlTable,
  varchar,
  date,
  boolean,
  timestamp,
  mysqlEnum,
  unique,
} from 'drizzle-orm/mysql-core';

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
    createAt: timestamp('createAt', { mode: 'date' }),
    updateAt: timestamp('updateAt', { mode: 'date' }),
  },
  (t) => [unique('custom_unique').on(t.cid_hash, t.hos_code)]
);

export const persons = mysqlTable('person', {
  pid: varchar('pid', { length: 36 }).primaryKey(),
  pid_hdc: varchar('pid_hdc', { length: 36 }).notNull(),
  med_id: varchar('med_id', { length: 255 }).notNull(),
  hcode_cid: varchar('hcode_cid', { length: 100 }).notNull(),
  sex: varchar('sex', { length: 1 }).notNull(),
  idcard: varchar('idcard', { length: 13 }).notNull().unique(),
  title: varchar('title', { length: 100 }).notNull(),
  first_name: varchar('first_name', { length: 255 }).notNull(),
  last_name: varchar('last_name', { length: 255 }).notNull(),
  birth: date('birth').notNull(),
  phone: varchar('phone', { length: 10 }).notNull(),
  boot_type: varchar('boot_type', { length: 255 }).notNull(),
  // consent: varchar('consent', { length: 255 }).notNull(),
  status: mysqlEnum('status', ['approve', 'cancel', 'delete']).notNull(), // approve cancel delete
  reason_cancel: varchar('reason_cancel', { length: 255 }).notNull(),
  consent: boolean('consent').default(false).notNull(), // TRUE / FALSE
  hcode: varchar('hcode', { length: 100 }).notNull(),
  guardian: varchar('guardian', { length: 100 }).notNull(),
  is_delect: boolean('is_delect').default(false),
  village: varchar('village', { length: 100 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// title
export const title_normalize = mysqlTable('title_normalize', {
  title_id: varchar('title_id', { length: 45 }).notNull(),
  title_th: varchar('title_th', { length: 45 }).notNull(),
  title_en: varchar('title_en', { length: 45 }).notNull(),
});

// guardian table
export const guardians = mysqlTable('guardian', {
  guardian_id: varchar('guardian_id', { length: 36 }).primaryKey(),
  relationships: varchar('relationships', { length: 100 }).notNull(),
  idcard: varchar('idcard', { length: 13 }).notNull().unique(),
  title: varchar('title', { length: 100 }).notNull(),
  first_name: varchar('first_name', { length: 255 }).notNull(),
  last_name: varchar('last_name', { length: 255 }).notNull(),
  birth: date('birth').notNull(),
  phone: varchar('phone', { length: 10 }).notNull(),
  hcode: varchar('hcode', { length: 100 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// medical_history tabel
export const medical_history = mysqlTable('medical_history', {
  med_id: varchar('med_id', { length: 36 }).primaryKey(),
  chronic_disease: varchar('chronic_disease', { length: 255 }).notNull(), // โรคประจำตัว
  allergy_history: varchar('allergy_history', { length: 255 }).notNull(), // ประวัติแพ้ยา
  allergy_symptoms: varchar('allergy_symptoms', { length: 255 }).notNull(), // อาการแพ้ยา
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// address tabel
export const address = mysqlTable('address', {
  hcode: varchar('hcode', { length: 36 }).primaryKey(),
  hcode_hdc: varchar('hcode_hdc', { length: 100 }).notNull(),
  // type_card: mysqlEnum('type_card', ['ID_CARD', 'CURRENT']).notNull(), // enum
  hno: varchar('hno', { length: 100 }).notNull(),
  village: varchar('village', { length: 255 }).notNull(),
  street: varchar('street', { length: 255 }).notNull(),
  moo: varchar('moo', { length: 255 }).notNull(),
  villcode: varchar('villcode', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// villcode
export const villcode = mysqlTable('villcode', {
  address_code: varchar('address_code', { length: 36 }).primaryKey(),
  prov_code: varchar('prov_code', { length: 10 }).notNull(),
  prov_name: varchar('prov_name', { length: 255 }).notNull(),
  dist_code: varchar('dist_code', { length: 10 }).notNull(),
  dist_name: varchar('dist_name', { length: 255 }).notNull(),
  subdist_code: varchar('subdist_code', { length: 10 }).notNull(),
  subdist_name: varchar('subdist_name', { length: 255 }).notNull(),
  area: varchar('area', { length: 255 }).notNull(),
  area_code: varchar('area_code', { length: 10 }).notNull(),
  zip_code: varchar('zip_code', { length: 10 }).notNull(),
});

export const address_code = mysqlTable('address_code', {
  addresscode: varchar('addresscode', { length: 100 }).primaryKey(),
  provcode: varchar('provcode', { length: 100 }).notNull(),
  provname: varchar('provname', { length: 255 }).notNull(),
  distcode: varchar('distcode', { length: 100 }).notNull(),
  distname: varchar('distname', { length: 255 }).notNull(),
  subdistcode: varchar('subdistcode', { length: 100 }).notNull(),
  subdistname: varchar('subdistname', { length: 255 }).notNull(),
  area: varchar('area', { length: 100 }).notNull(),
  areacode: varchar('areacode', { length: 100 }).notNull(),
  zipcode: varchar('zipcode', { length: 100 }).notNull(),
});
