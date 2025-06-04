import { ScreeningRepository } from '../infra/screening.repository';
import {
  DecodedToken,
  PaginationQuery,
  PaginationResponse,
  ScreeningListResponseDTO,
  SqlScreeningResponse,
} from '../model/screening.model';
import { Crypto } from '@/core/crypto';

export async function getScreeningList(
  query: PaginationQuery,
  cookie: DecodedToken
): Promise<PaginationResponse<ScreeningListResponseDTO>> {
  try {
    const hosCode = cookie.hos_code;
    const rawScreeningList = await ScreeningRepository.getScreeningList(hosCode);

    if (!rawScreeningList || rawScreeningList.length === 0) {
      return {
        success: true,
        data: [],
        pagination: {
          total: 0,
          page: query.page || 1,
          limit: query.limit || 10,
        },
        message: 'Data not found',
      };
    }

    let filteredRawData = applyFilters(rawScreeningList, query);
    let screeningList = filteredRawData.map(convertToDTO);

    const page = query.page || 1;
    const limit = query.limit || 10;
    const total = screeningList.length;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = screeningList.slice(startIndex, endIndex);

    return {
      success: true,
      data: paginatedData,
      pagination: {
        total,
        page,
        limit,
      },
      message: 'Data fetched successfully',
    };
  } catch (error) {
    console.error('Error fetching screening list:', error);
    return {
      success: false,
      data: [],
      pagination: {
        total: 0,
        page: query.page || 1,
        limit: query.limit || 10,
      },
      message: 'Failed to fetch screening list',
    };
  }
}

function convertToDTO(rawData: SqlScreeningResponse): ScreeningListResponseDTO {
  const date = new Date(rawData.visit_date.getTime() + 7 * 60 * 60 * 1000);

  const decryptedPersonFname = Crypto.decrypt(rawData.person_fname || '');
  const decryptedPersonLname = Crypto.decrypt(rawData.person_lname || '');
  const decryptedProviderFname = Crypto.decrypt(rawData.provider_fname || '');
  const decryptedProviderLname = Crypto.decrypt(rawData.provider_lname || '');

  return {
    visit_id: rawData.visit_id,
    visit_date: date.toISOString().split('T')[0],
    visit_time: date.toISOString().split('T')[1].split('.')[0],
    pid: rawData.person_id || '',
    person_fullname: `${rawData.person_title} ${decryptedPersonFname} ${decryptedPersonLname}`,
    inscl_name: rawData.inscl_name || '',
    provider_fullname: `${rawData.provider_title} ${decryptedProviderFname} ${decryptedProviderLname}`,
    id_card: rawData.id_card || '',
    status_screening: rawData.status_screening,
    role: rawData.role || '',
    screening_form_id: rawData.screening_form_id,
  };
}

function applyFilters(screeningList: SqlScreeningResponse[], query: PaginationQuery): SqlScreeningResponse[] {
  let filteredData = [...screeningList];

  if (query.search) {
    const searchQuery = query.search;
    const encryptedSearch = Crypto.encrypt(searchQuery);

    filteredData = filteredData.filter((item) => {
      const firstNameMatch = item.person_fname === encryptedSearch || item.person_lname === encryptedSearch;
      const idCardMatch = item.id_card === encryptedSearch;
      const providerNameMatch = item.provider_fname === encryptedSearch || item.provider_lname === encryptedSearch;

      return firstNameMatch || idCardMatch || providerNameMatch;
    });
  }

  if (query.status) {
    filteredData = filteredData.filter((item) => item.status_screening === query.status);
  }

  if (query.filter) {
    filteredData = filteredData.filter((item) => item.role === query.filter);
  }

  if (query.date) {
    filteredData = filteredData.filter((item) => {
      const itemDate = new Date(item.visit_date.getTime() + 7 * 60 * 60 * 1000);
      const itemDateString = itemDate.toISOString().split('T')[0];
      return itemDateString === query.date;
    });
  }

  filteredData.sort((a, b) => {
    const dateA = new Date(a.visit_date.getTime() + 7 * 60 * 60 * 1000);
    const dateB = new Date(b.visit_date.getTime() + 7 * 60 * 60 * 1000);
    return dateB.getTime() - dateA.getTime(); // เรียงจากใหม่ไปเก่า
  });

  return filteredData;
}
