import { t } from "elysia";

export interface UserProfileDTO {
  cid : string;
  hos_code: string;
  name: string;
  position: string;
  phone_number: string;
  dob: string;
  email : string;
  usage_rights: string;
  signature_pad: string | null
}

export interface VhvProfileDTO {
  cid : string;
  name: string;
  position: string;
  phone_number: string;
  dob: string;
  usage_rights: string;
  work_area : string;
  address : string
}

export type ProfileResult = UserProfileDTO | VhvProfileDTO;

export const UserProfile = t.Object({
  cid: t.String(),
  hos_code: t.String(),
  name: t.String(),
  position: t.String(),
  phone_number: t.String(),
  dob: t.String(),
  email: t.String(),
  usage_rights: t.String(),
  signature_pad: t.Nullable(t.String()),
});

export const VhvProfile = t.Object({
  cid: t.String(),
  name: t.String(),
  position: t.String(),
  phone_number: t.String(),
  dob: t.String(),
  usage_rights: t.String(),
  work_area: t.String(),
  address: t.String()
});