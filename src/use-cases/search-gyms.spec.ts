import { describe, it, expect, beforeEach } from 'vitest';

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';

import { SearchGymsUseCase } from './search-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'gym-1',
      description: null,
      phone: null,
      latitude: -10.8044212,
      longitude: -50.5641168,
    });

    await gymsRepository.create({
      title: 'gym-2',
      description: null,
      phone: null,
      latitude: -10.8044212,
      longitude: -50.5641168,
    });

    const { gyms } = await sut.execute({
      query: 'gym-1',
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'gym-1' })]);
  });

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `gym-${i}`,
        description: null,
        phone: null,
        latitude: -10.8044212,
        longitude: -50.5641168,
      });
    }

    const { gyms } = await sut.execute({
      query: 'gym',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'gym-21' }),
      expect.objectContaining({ title: 'gym-22' }),
    ]);
  });
});
