import { Prisma, User } from '@prisma/client';

import { IUsersRepository } from '../users-repository';

class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = [];

  async findByUserId(userId: string) {
    const user = this.users.find(user => user.id === userId);

    return user ?? null;
  }

  async findByEmail(email: string) {
    const user = this.users.find(user => user.email === email);

    return user ?? null;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.users.push(user);

    return user;
  }
}

export { InMemoryUsersRepository };
