import { CheckIn, Prisma } from '@prisma/client';

interface ICheckInsRepository {
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
}

export { ICheckInsRepository };
