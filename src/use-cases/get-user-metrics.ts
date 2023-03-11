import { ICheckInsRepository } from '@/repositories/check-ins-repository';

interface IGetUserMetricsRequest {
  userId: string;
}

interface IGetUserMetricsResponse {
  checkInsCount: number;
}

class GetUserMetricsUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
  }: IGetUserMetricsRequest): Promise<IGetUserMetricsResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return {
      checkInsCount,
    };
  }
}

export { GetUserMetricsUseCase };
