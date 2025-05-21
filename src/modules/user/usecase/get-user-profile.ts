import { UserProfileDTO } from "../model/user.model";

export async function getUserProfile(decoded: any): Promise<UserProfileDTO> {
 
    let right = "ผู้ใช้งานทั่วไป";

    if (decoded.position === "อสม." || decoded.position === "อสม" || decoded.position === "อาสาสมัครสาธารณสุขประจำหมู่บ้าน (อสม.)") {
        right = "อสม.";
        
    }
    
    const profile: UserProfileDTO = {
        cid: decoded.cid_hash,
        hos_code: decoded.hos_code,
        name:  `${decoded.title || ''} ${decoded.fname || ''} ${decoded.lname || '-'}`.trim(),
        position: decoded.position,
        phone_number:  '-',
        usage_rights: right,
        dob: decoded.dob || '-',
        email: decoded.email || null,
        signature_pad: decoded.signature_pad || null,
        moo: decoded.moo || null,
        address: decoded.address || null,
    };
    
    return profile;

}