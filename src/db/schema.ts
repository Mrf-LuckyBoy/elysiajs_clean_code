import { mysqlTable, varchar, timestamp, unique } from 'drizzle-orm/mysql-core';

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
