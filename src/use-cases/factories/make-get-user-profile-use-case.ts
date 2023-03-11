import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

import { GetUserProfileUseCase } from '../get-user-profile';

function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetUserProfileUseCase(usersRepository);

  return useCase;
}

export { makeGetUserProfileUseCase };
