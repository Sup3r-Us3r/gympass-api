import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';

import { CheckInUseCase } from './check-in';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.gyms.push({
      id: 'gym-1',
      title: 'Gym',
      description: 'Gym description',
      phone: '',
      latitude: new Decimal(-10.8044212),
      longitude: new Decimal(-50.5641168),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -10.8044212,
      userLongitude: -50.5641168,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 8, 0, 0));

    await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -10.8044212,
      userLongitude: -50.5641168,
    });

    await expect(() =>
      sut.execute({
        userId: 'user-1',
        gymId: 'gym-1',
        userLatitude: -10.8044212,
        userLongitude: -50.5641168,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 8, 0, 0));

    await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -10.8044212,
      userLongitude: -50.5641168,
    });

    vi.setSystemTime(new Date(2023, 0, 2, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -10.8044212,
      userLongitude: -50.5641168,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.gyms.push({
      id: 'gym-2',
      title: 'Gym',
      description: 'Gym description',
      phone: '',
      latitude: new Decimal(-27.8044212),
      longitude: new Decimal(-45.8044212),
    });

    await expect(() =>
      sut.execute({
        userId: 'user-1',
        gymId: 'gym-2',
        userLatitude: -10.8044212,
        userLongitude: -50.5641168,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
