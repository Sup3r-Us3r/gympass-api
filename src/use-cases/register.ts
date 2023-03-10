import { hash } from 'bcryptjs';

import { IUsersRepository } from '@/repositories/users-repository';
import type { User } from '@prisma/client';

import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface IRegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface IRegisterUseCaseResponse {
  user: User;
}

class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: IRegisterUseCaseRequest): Promise<IRegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });

    return {
      user,
    };
  }
}

export { RegisterUseCase };
