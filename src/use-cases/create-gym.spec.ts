import { describe, it, expect, beforeEach } from 'vitest';

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';

import { CreateGymUseCase } from './create-gym';

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it('should be able to register user', async () => {
    const { gym } = await sut.execute({
      title: 'Gym',
      description: null,
      phone: null,
      latitude: -10.8044212,
      longitude: -50.5641168,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
