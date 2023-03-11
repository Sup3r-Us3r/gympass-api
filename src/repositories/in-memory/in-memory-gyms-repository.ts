import { randomUUID } from 'crypto';

import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import { Gym, Prisma } from '@prisma/client';

import { IFindManyNearby, IGymsRepository } from '../gyms-repository';

class InMemoryGymsRepository implements IGymsRepository {
  public gyms: Gym[] = [];

  async findByGymId(gymId: string) {
    const gym = this.gyms.find(gym => gym.id === gymId);

    return gym ?? null;
  }

  async findManyNearby(params: IFindManyNearby) {
    return this.gyms.filter(gym => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      );

      return distance < 10;
    });
  }

  async searchMany(query: string, page: number) {
    const gyms = this.gyms
      .filter(gym => gym.title.toLowerCase().includes(query.toLowerCase()))
      .slice((page - 1) * 20, page * 20);

    return gyms;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.gyms.push(gym);

    return gym;
  }
}

export { InMemoryGymsRepository };
