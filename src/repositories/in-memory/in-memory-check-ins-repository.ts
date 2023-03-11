import { randomUUID } from 'crypto';
import dayjs from 'dayjs';

import { CheckIn, Prisma } from '@prisma/client';

import { ICheckInsRepository } from '../check-ins-repository';

class InMemoryCheckInsRepository implements ICheckInsRepository {
  public checkIns: CheckIn[] = [];

  async findById(id: string) {
    const checkIn = this.checkIns.find(checkIn => checkIn.id === id);

    return checkIn ?? null;
  }

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

  async countByUserId(userId: string) {
    const checkIns = this.checkIns.filter(
      checkIn => checkIn.user_id === userId,
    );

    return checkIns.length;
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

  async save(checkIn: CheckIn) {
    const checkInIndex = this.checkIns.findIndex(
      currentCheckIn => currentCheckIn.id === checkIn.id,
    );

    if (checkInIndex >= 0) {
      this.checkIns[checkInIndex] = checkIn;
    }

    return checkIn;
  }
}

export { InMemoryCheckInsRepository };
