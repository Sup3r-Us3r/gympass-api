import { ICheckInsRepository } from '@/repositories/check-ins-repository';
import { CheckIn } from '@prisma/client';

interface IFetchUserCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface IFetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
    page,
  }: IFetchUserCheckInsHistoryUseCaseRequest): Promise<IFetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return {
      checkIns,
    };
  }
}

export { FetchUserCheckInsHistoryUseCase };
