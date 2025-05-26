import { t, Context } from 'elysia';
import { getTitlesName } from '../usecase/gets-title-dropdown';
import { HttpResponse, HttpResponseSchema } from '@/core/http.response';
import {
  TitleNormalizeSchema,
  TitleName,
  addressSchema,
  AddressCode,
  RelationshipSchema,
  Relationship,
  users,
  usersVhv,
} from '../model/dropdown.model';
import { getAddressCode } from '../usecase/get-address.dropdown';
import { getRelationship } from '../usecase/get-relationship';
import { getNameUsers } from '../usecase/get-users.dropdown';
import { getNameUsersVhv } from '../usecase/get-uservhv.dropdown';

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
        let addresscode: AddressCode[] = await getAddressCode();
        addresscode = addresscode.filter((item) => item.addresscode !== '');
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
  dropdownUser: {
    Schema: {
      query: t.Object({
        search: t.String({ description: 'search name' }),
      }),
      response: {
        201: t.Object({
          success: t.Boolean(),
          message: t.String(),
          data: t.Array(
            t.Object({
              user_id: t.String(),
              fullname: t.String(),
            })
          ),
        }),
        500: HttpResponseSchema.error(),
      },
      summary: 'user dropdown',
      description: 'get list of user',
      tags: ['Dropdown'],
    },
    handler: async ({ set, query }: Context) => {
      try {
        const searchName = query.search?.toLowerCase() ?? '';
        const userResult: users[] = await getNameUsers();
        const dropdownList = userResult
          .map((user) => ({
            user_id: user.user_id,
            fullname: `${user.fname} ${user.lname}`,
          }))
          .filter((user) => user.fullname.toLowerCase().includes(searchName));
        set.status = 200;
        return HttpResponse.success(dropdownList);
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
  dropdownUserVhv: {
    Schema: {
      query: t.Object({
        search: t.String({ description: 'search name' }),
      }),
      response: {
        201: t.Object({
          success: t.Boolean(),
          message: t.String(),
          data: t.Array(
            t.Object({
              user_id: t.String(),
              fullname: t.String(),
            })
          ),
        }),
        500: HttpResponseSchema.error(),
      },
      summary: 'user vhv dropdown',
      description: 'get list of user vhv',
      tags: ['Dropdown'],
    },
    handler: async ({ set, query }: Context) => {
      try {
        const searchName = query.search?.toLowerCase() ?? '';
        const userVhvResult: usersVhv[] = await getNameUsersVhv();
        const dropdownListVhv = userVhvResult
          .map((user) => ({
            user_id: user.user_id,
            fullname: `${user.fname} ${user.lname}`,
          }))
          .filter((user) => user.fullname.toLowerCase().includes(searchName));
        set.status = 200;
        return HttpResponse.success(dropdownListVhv);
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
