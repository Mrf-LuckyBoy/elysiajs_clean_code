import { mysqlTable, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const user_provider = mysqlTable('user_provider', {
  user_id: varchar('user_id', { length: 36 }).primaryKey().notNull(),
  cid_hash: varchar('cid_hash', { length: 255 }).unique().notNull(),
  hos_code: varchar('hos_code', { length: 10 }).unique().notNull(),
  hos_name: varchar('hos_name', { length: 255 }),
  title: varchar('title', { length: 255 }),
  fname: varchar('fname', { length: 255 }),
  lname: varchar('lname', { length: 255 }),
  position: varchar('position', { length: 255 }).unique().notNull(),
  createAt: timestamp('createAt', { mode: 'date' }),
  updateAt: timestamp('updateAt', { mode: 'date' }),
});

export const user_provider_vhv = mysqlTable('user_provider_vhv', {
  user_id: varchar('user_id', { length: 36 }).primaryKey().notNull(),
  cid_hash: varchar('cid_hash', { length: 255 }).unique().notNull(),
  hos_code: varchar('hos_code', { length: 10 }).unique().notNull(),
  hos_name: varchar('hos_name', { length: 255 }),
  title: varchar('title', { length: 255 }),
  fname: varchar('fname', { length: 255 }),
  lname: varchar('lname', { length: 255 }),
  position: varchar('position', { length: 255 }).unique().notNull(),
  createAt: timestamp('createAt', { mode: 'date' }),
  updateAt: timestamp('updateAt', { mode: 'date' }),
});
