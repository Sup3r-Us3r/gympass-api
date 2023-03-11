import { randomUUID } from 'crypto';
import dayjs from 'dayjs';

import { CheckIn, Prisma } from '@prisma/client';

import { ICheckInsRepository } from '../check-ins-repository';

class InMemoryCheckInsRepository implements ICheckInsRepository {
  public checkIns: CheckIn[] = [];

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const checkOnSameDate = this.checkIns.find(checkIn => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkOnSameDate) {
      return null;
    }

    return checkOnSameDate;
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = this.checkIns
      .filter(checkIn => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20);

    return checkIns;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.checkIns.push(checkIn);

    return checkIn;
  }
}

export { InMemoryCheckInsRepository };
