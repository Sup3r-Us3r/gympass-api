import { Gym } from '@prisma/client';

import { IGymsRepository } from '../gyms-repository';

class InMemoryGymsRepository implements IGymsRepository {
  public gyms: Gym[] = [];

  async findByGymId(gymId: string) {
    const gym = this.gyms.find(gym => gym.id === gymId);

    return gym ?? null;
  }
}

export { InMemoryGymsRepository };
