import { Gym, Prisma } from '@prisma/client';

interface IGymsRepository {
  findByGymId(gymId: string): Promise<Gym | null>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
}

export { IGymsRepository };
