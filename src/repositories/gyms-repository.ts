import { Gym, Prisma } from '@prisma/client';

interface IGymsRepository {
  findByGymId(gymId: string): Promise<Gym | null>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
}

export { IGymsRepository };
