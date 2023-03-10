import { hash } from 'bcryptjs';

import { IUsersRepository } from '@/repositories/users-repository';

import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface IRegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: IRegisterUseCaseRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });
  }
}

export { RegisterUseCase };
