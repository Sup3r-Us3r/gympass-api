import { ICheckInsRepository } from '@/repositories/check-ins-repository';
import { CheckIn } from '@prisma/client';

import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface IValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface IValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

class ValidateCheckInUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    checkInId,
  }: IValidateCheckInUseCaseRequest): Promise<IValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    checkIn.validated_at = new Date();

    this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}

export { ValidateCheckInUseCase };
