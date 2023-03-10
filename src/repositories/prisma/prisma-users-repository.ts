import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

import { IUsersRepository } from '../users-repository';

class PrismaUsersRepository implements IUsersRepository {
  async findByUserId(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}

export { PrismaUsersRepository };
