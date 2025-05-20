import { t } from 'elysia';

export interface UserProviderDTO {
  user_id: string;
  cid_hash: string;
  hos_code: string;
  hos_name?: string | null;
  title?: string | null;
  fname?: string | null;
  lname?: string | null;
  position: string;
  createAt: Date | null;
  updateAt: Date | null;
}

export const UserProviderSchema = t.Object({
  user_id: t.String(),
  cid_hash: t.String(),
  hos_code: t.String(),
  hos_name: t.Optional(t.Nullable(t.String())),
  title: t.Optional(t.Nullable(t.String())),
  fname: t.Optional(t.Nullable(t.String())),
  lname: t.Optional(t.Nullable(t.String())),
  position: t.String(),
  createAt: t.Nullable(t.Date()),
  updateAt: t.Nullable(t.Date()),
});

export interface LoginUser {
  cid_hash: string;
  hos_code: string;
  position: string;
}
