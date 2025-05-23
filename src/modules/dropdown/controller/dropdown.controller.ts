import { t, Context } from 'elysia';
import { getTitlesName } from '../usecase/gets-title-dropdown';
import { HttpResponse, HttpResponseSchema } from '@/core/http.response';
import { TitleNormalizeSchema, TitleName } from '../model/dropdown.model';

export const dropdownController = {
  dropDownTitle: {
    Schema: {
      response: {
        201: t.Object({
          success: t.Boolean(),
          message: t.String(),
          data: t.Array(TitleNormalizeSchema),
        }),
        500: HttpResponseSchema.error(),
      },
      summary: 'titlename Dropdown',
      description: 'get list of titlename',
      tags: ['Dropdown'],
    },
    handler: async ({ set }: Context) => {
      try {
        const result: TitleName[] = await getTitlesName();
        set.status = 200;
        return HttpResponse.success(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          set.status = 500;
          return HttpResponse.error(err.message);
        } else {
          set.status = 500;
          return HttpResponse.error('Unexpected error');
        }
      }
    },
  },
};
