import { ProfileResult, UserProfileDTO, VhvProfileDTO } from "../model/user.model";

export async function getUserProfile(decoded: any): Promise<ProfileResult> {
 
    let right = "ผู้ใช้งานทั่วไป";

    const isVhv = decoded.position === "อสม." ||
                decoded.position === "อสม" ||
                decoded.position === "อาสาสมัครสาธารณสุขประจำหมู่บ้าน (อสม.)";
    if (isVhv) {
        right = "อสม.";
    
    const vhvProfile: VhvProfileDTO = {
        cid: decoded.cid_hash,
        name :  `${decoded.title} ${decoded.fname} ${decoded.lname}`.trim(),
        position: decoded.position || '-',
        phone_number:  decoded.phone_number || '-',
        usage_rights: right,
        dob: decoded.dob || '-',
        work_area: decoded.work_area || '-',
        address: decoded.address || '-',
    };
    return vhvProfile;

    } else {
        const useProfile: UserProfileDTO = {
            cid: decoded.cid_hash,
            hos_code: decoded.hos_code,
            name:  `${decoded.title || ''} ${decoded.fname || ''} ${decoded.lname || '-'}`.trim(),
            position: decoded.position,
            phone_number:  decoded.phone_number || '-',
            usage_rights: right,
            dob: decoded.dob || '-',
            email: decoded.email || '-',
            signature_pad: decoded.signature_pad || null,
        };
        return useProfile;
    }
}