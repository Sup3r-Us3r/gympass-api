import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

import { RegisterUseCase } from '../register';

function makeRegisterUserCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new RegisterUseCase(usersRepository);

  return useCase;
}

export { makeRegisterUserCase };
