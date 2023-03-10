import { Prisma, User } from '@prisma/client';

interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}

export { IUsersRepository };
