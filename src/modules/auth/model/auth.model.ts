import { t } from 'elysia';

export interface UserProviderDTO {
  user_id: string;
  cid_hash: string;
  hos_code: string;
  hos_name: string;
  title: string;
  fname: string;
  lname: string;
  position: string;
  createAt: Date;
  updateAt: Date;
}

export const UserProviderSchema = t.Object({
  user_id: t.String(),
  cid_hash: t.String(),
  hos_code: t.String(),
  hos_name: t.String(),
  title: t.String(),
  fname: t.String(),
  lname: t.String(),
  position: t.String(),
  createAt: t.Date(),
  updateAt: t.Date(),
});
