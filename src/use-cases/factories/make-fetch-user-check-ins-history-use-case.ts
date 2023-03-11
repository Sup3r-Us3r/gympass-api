import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';

import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history';

function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
}

export { makeFetchUserCheckInsHistoryUseCase };
