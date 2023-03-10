import { Gym } from '@prisma/client';

interface IGymsRepository {
  findByGymId(gymId: string): Promise<Gym | null>;
}

export { IGymsRepository };
