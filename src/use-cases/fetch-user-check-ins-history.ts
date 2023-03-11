import { ICheckInsRepository } from '@/repositories/check-ins-repository';
import { CheckIn } from '@prisma/client';

interface IFetchUserCheckInsHistoryRequest {
  userId: string;
  page: number;
}

interface IFetchUserCheckInsHistoryResponse {
  checkIns: CheckIn[];
}

class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
    page,
  }: IFetchUserCheckInsHistoryRequest): Promise<IFetchUserCheckInsHistoryResponse> {
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
