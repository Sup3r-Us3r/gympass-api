import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@/app';
import { createAndAuthenticateUsers } from '@/utils/test/create-and-authenticate-users';

describe('Search Gyms Controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUsers(app);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym 1',
        description: 'Some description',
        phone: '1140028922',
        latitude: -22.951916,
        longitude: -43.2126759,
      });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym 2',
        description: 'Some description',
        phone: '1140028922',
        latitude: -22.951916,
        longitude: -43.2126759,
      });

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'Gym 1',
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Gym 1',
      }),
    ]);
  });
});
