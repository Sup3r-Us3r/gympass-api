import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';

import { CheckInUseCase } from '../check-in';

function makeCheckInUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository);

  return useCase;
}

export { makeCheckInUseCase };
