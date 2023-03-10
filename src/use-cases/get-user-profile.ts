import { IUsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface IGetUserProfileUseCaseRequest {
  userId: string;
}

interface IGetUserProfileUseCaseResponse {
  user: User;
}

class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
  }: IGetUserProfileUseCaseRequest): Promise<IGetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findByUserId(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}

export { GetUserProfileUseCase };
