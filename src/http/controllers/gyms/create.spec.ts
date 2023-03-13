import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@/app';
import { createAndAuthenticateUsers } from '@/utils/test/create-and-authenticate-users';

describe('Create Gym Controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUsers(app);

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym',
        description: 'Some description',
        phone: '1140028922',
        latitude: -22.951916,
        longitude: -43.2126759,
      });

    expect(response.statusCode).toEqual(201);
  });
});
