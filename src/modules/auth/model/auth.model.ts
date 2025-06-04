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
  hno: string | null;
  soi_road: string | null;
  province: string | null;
  district: string | null;
  sub_district: string | null;
  createAt: Date | null;
  updateAt: Date | null;
}

export interface UserProviderResponseDTO {
  cid: string;
  useable: UserProviderDTO[];
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
  hno: t.Optional(t.Nullable(t.String())),
  soi_road: t.Optional(t.Nullable(t.String())),
  province: t.Optional(t.Nullable(t.String())),
  district: t.Optional(t.Nullable(t.String())),
  sub_district: t.Optional(t.Nullable(t.String())),
  createAt: t.Nullable(t.Date()),
  updateAt: t.Nullable(t.Date()),
});

export const UserProviderResponseSchema = t.Object({
  cid: t.String(),
  useable: t.Array(UserProviderSchema),
});

export interface LoginUser {
  cid_hash: string;
  hos_code: string;
  position: string;
}
