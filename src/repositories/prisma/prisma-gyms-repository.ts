import { prisma } from '@/lib/prisma';
import { Gym, Prisma } from '@prisma/client';

import { IFindManyNearby, IGymsRepository } from '../gyms-repository';

class PrismaGymsRepository implements IGymsRepository {
  async findByGymId(gymId: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id: gymId,
      },
    });

    return gym;
  }

  async findManyNearby({ latitude, longitude }: IFindManyNearby) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT
        *
      FROM
        gyms
      WHERE
        (
          6371 * ACOS(
            COS(
              RADIANS(${latitude})
            ) * COS(
              RADIANS(latitude)
            ) * COS(
              RADIANS(longitude) - RADIANS(${longitude})
            ) + SIN(
              RADIANS(${latitude})
            ) * SIN(
              RADIANS(latitude)
            )
          )
        ) <= 10
    `;

    return gyms;
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    });

    return gym;
  }
}

export { PrismaGymsRepository };
