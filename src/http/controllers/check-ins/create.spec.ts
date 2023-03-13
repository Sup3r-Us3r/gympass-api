import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { createAndAuthenticateUsers } from '@/utils/test/create-and-authenticate-users';

describe('Create Check-in Controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUsers(app);

    const gym = await prisma.gym.create({
      data: {
        title: 'Gym 1',
        latitude: -22.951916,
        longitude: -43.2126759,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -22.951916,
        longitude: -43.2126759,
      });

    expect(response.statusCode).toEqual(201);
  });
});
