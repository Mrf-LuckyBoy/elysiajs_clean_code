import { t, Context } from 'elysia';
import { getTitlesName } from '../usecase/gets-title-dropdown';
import { HttpResponse, HttpResponseSchema } from '@/core/http.response';
import {
  TitleNormalizeSchema,
  TitleName,
  addressSchema,
  AddressCode,
  RelationshipSchema,
  Relationship
} from '../model/dropdown.model';
import { getAddressCode } from '../usecase/get-address.dropdown';
import { getRelationship } from '../usecase/get-relationship';

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
  dropdownAddress: {
    Schema: {
      response: {
        201: t.Object({
          success: t.Boolean(),
          message: t.String(),
          data: t.Array(addressSchema),
        }),
        500: HttpResponseSchema.error(),
      },
      summary: 'address dropdown',
      description: 'get list of address',
      tags: ['Dropdown'],
    },
    handler: async ({ set }: Context) => {
      try {
        const addresscode: AddressCode[] = await getAddressCode();
        set.status = 200;
        return HttpResponse.success(addresscode);
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
  dropdownRelationship: {
    Schema: {
      response: {
        201: t.Object({
          success: t.Boolean(),
          message: t.String(),
          data: t.Array(RelationshipSchema),
        }),
        500: HttpResponseSchema.error(),
      },
      summary: 'Relationship dropdown',
      description: 'get list of Relationship',
      tags: ['Dropdown'],
    },
    handler: async ({ set }: Context) => {
      try {
        const relationshipResult: Relationship[] = await getRelationship();
        set.status = 200;
        return HttpResponse.success(relationshipResult);
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
