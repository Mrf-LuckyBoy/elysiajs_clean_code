export interface BaseResponseFDH<T> {
  status: number | string;
  message: string;
  message_th: string;
  data: T;
}

export type CheckRightResponse = BaseResponseFDH<{
  pid: string;
  full_name: string;
  birth_data: string;
  nation: string;
  main_inscl: string;
  sub_inscl: string;
}>;
