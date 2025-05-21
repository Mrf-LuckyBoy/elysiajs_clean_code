export interface UserDTO {
  id: string;
  name: string;
}

export interface UserProfileDTO {
  cid : string;
  hos_code: string;
  name: string;
  position: string;
  phone_number: string;
  dob: string;
  email : string | null;
  usage_rights: string | null;
  signature_pad: string | null;
  moo : string | null;
  address : string | null
}