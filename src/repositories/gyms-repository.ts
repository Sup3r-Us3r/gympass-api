import { Gym, Prisma } from '@prisma/client';

interface IFindManyNearby {
  latitude: number;
  longitude: number;
}

interface IGymsRepository {
  findByGymId(gymId: string): Promise<Gym | null>;
  findManyNearby(params: IFindManyNearby): Promise<Gym[]>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
}

export { IGymsRepository, type IFindManyNearby };
