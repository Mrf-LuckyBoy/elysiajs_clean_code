export interface BaseResponse<T> {
  status: number | string;
  message: string;
  status_code?: number;
  data: T;
}

export type HealthIdLoginResponse = BaseResponse<{
  access_token: string;
  token_type: string;
  expires_in: number;
  account_id: string;
}>;

export type TokenProviderIDResponse = BaseResponse<{
  token_type: string;
  expires_in: number;
  access_token: string;
  expiration_date: string;
  account_id: string;
  result: string;
  username: string;
  login_by: string;
}>;

export type ProviderResponse = BaseResponse<ProviderData>;

export interface ProviderData {
  account_id: string;
  hash_cid: string;
  provider_id: string;
  title_th: string;
  special_title_th: string;
  name_th: string;
  name_eng: string;
  created_at: string | null;
  title_en: string;
  special_title_en: string;
  firstname_th: string;
  lastname_th: string;
  firstname_en: string;
  lastname_en: string;
  date_of_birth: string;
  organization: Organization[];
}

export interface Organization {
  business_id: string;
  position: string;
  position_id: string;
  affiliation: string;
  license_id: string;
  hcode: string;
  code9: string | null;
  hcode9: string | null;
  level: string;
  hname_th: string;
  hname_eng: string;
  tax_id: string;
  license_expired_date: string | null;
  expertise: string | null;
  moph_station_ref_code: string | null;
  moph_access_token_idp: string;
  address: Address;
  is_hr_admin: boolean;
  is_director: boolean;
}

export interface Address {
  address: string;
  moo: string | null;
  building: string | null;
  soi: string | null;
  street: string | null;
  province: string;
  district: string;
  sub_district: string;
  zip_code: string;
}
