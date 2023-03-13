import type { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';

import { authenticate } from './authenticate';
import { profile } from './profile';
import { refresh } from './refresh';
import { register } from './register';

async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  app.patch('/token/refresh', refresh);

  // Authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}

export { usersRoutes };
