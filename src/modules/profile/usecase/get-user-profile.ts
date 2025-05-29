import {
  ProfileResult,
  UserProfileDTO,
  VhvProfileDTO,
} from '../model/profile.model';

export async function getUserProfile(decoded: any): Promise<ProfileResult> {
  let right = 'ผู้ใช้งานทั่วไป';

  const isVhv =
    decoded.position === 'อสม.' ||
    decoded.position === 'อสม' ||
    decoded.position === 'อาสาสมัครสาธารณสุขประจำหมู่บ้าน (อสม.)';
  if (isVhv) {
    right = 'อสม.';

    const vhvProfile: VhvProfileDTO = {
      cid: decoded.cid_hash,
      name: `${decoded.title} ${decoded.fname} ${decoded.lname}`.trim(),
      position: decoded.position || '-',
      phone_number: decoded.phone_number || '-',
      usage_rights: right,
      dob: decoded.dob || '-',
      work_area: decoded.work_area || '-',
      hno: decoded.hno || '-',
      soi_road: decoded.soi_road || '-',
      province: decoded.province || '-',
      district: decoded.district || '-',
      sub_district: decoded.sub_district || '-',
    };
    return vhvProfile;
  } else {
    const useProfile: UserProfileDTO = {
      cid: decoded.cid_hash,
      hos_code: decoded.hos_code,
      name: `${decoded.title || ''} ${decoded.fname || ''} ${decoded.lname || '-'}`.trim(),
      position: decoded.position,
      phone_number: decoded.phone_number || '-',
      usage_rights: right,
      dob: decoded.dob || '-',
      email: decoded.email || '-',
      signature_pad: decoded.signature_pad || null,
      hno: decoded.hno || '-',
      soi_road: decoded.soi_road || '-',
      province: decoded.province || '-',
      district: decoded.district || '-',
      sub_district: decoded.sub_district || '-',
    };
    return useProfile;
  }
}
