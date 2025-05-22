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
