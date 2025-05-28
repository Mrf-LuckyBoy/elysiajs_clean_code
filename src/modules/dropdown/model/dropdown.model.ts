import { t } from 'elysia';

export interface TitleName {
  title_id: string;
  title_th: string;
  title_en: string;
}

export const TitleNormalizeSchema = t.Object({
  title_id: t.String({ maxLength: 45 }),
  title_th: t.String({ maxLength: 45 }),
  title_en: t.String({ maxLength: 45 }),
});

export interface AddressCode {
  addresscode: string;
  provcode: string;
  provname: string;
  distcode: string;
  distname: string;
  subdistcode: string;
  subdistname: string;
  area: string;
  areacode: string;
  zipcode: string;
}

export const addressSchema = t.Object({
  addresscode: t.String({ length: 100 }),
  provcode: t.String({ length: 100 }),
  provname: t.String({ length: 255 }),
  distcode: t.String({ length: 100 }),
  distname: t.String({ length: 255 }),
  subdistcode: t.String({ length: 100 }),
  subdistname: t.String({ length: 255 }),
  area: t.String({ length: 100 }),
  areacode: t.String({ length: 100 }),
  zipcode: t.String({ length: 100 }),
});

export interface Relationship {
  relationship_id: string;
  relationship_th: string;
  relationship_en: string;
}

export const RelationshipSchema = t.Object({
  relationship_id: t.String({ maxLength: 45 }),
  relationship_th: t.String({ maxLength: 45 }),
  relationship_en: t.String({ maxLength: 45 }),
});
export interface users {
  user_id: string;
  hos_code: string;
  hos_name: string;
  title: string;
  fname: string;
  lname: string;
}

export interface usersVhv {
  user_id: string;
  hos_code: string;
  hos_name: string;
  title: string;
  fname: string;
  lname: string;
}
