import { Prisma, User } from '@prisma/client';

interface IUsersRepository {
  findByUserId(userId: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}

export { IUsersRepository };
