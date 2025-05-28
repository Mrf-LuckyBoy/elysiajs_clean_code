import { db } from '@/db';
import { ScreeningResponseDTO } from '../model/screening.model';
import { screenings } from '@/db/schema';

export const ScreeningRepository = {
  async create(screening: ScreeningResponseDTO): Promise<void> {
    await db.insert(screenings).values(screening);
  },
};
