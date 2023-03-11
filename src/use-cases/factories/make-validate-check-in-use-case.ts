import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';

import { ValidateCheckInUseCase } from '../validate-check-in';

function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new ValidateCheckInUseCase(checkInsRepository);

  return useCase;
}

export { makeValidateCheckInUseCase };
