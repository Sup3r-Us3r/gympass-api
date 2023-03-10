import { IGymsRepository } from '@/repositories/gyms-repository';
import type { Gym } from '@prisma/client';

interface ICreateGymUseCaseRequest {
  title: string;
  description?: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface ICreateGymUseCaseResponse {
  gym: Gym;
}

class CreateGymUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: ICreateGymUseCaseRequest): Promise<ICreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return {
      gym,
    };
  }
}

export { CreateGymUseCase };
