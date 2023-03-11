import type { FastifyInstance } from 'fastify';

import { authenticate } from './controllers/authenticate';
import { profile } from './controllers/profile';
import { register } from './controllers/register';
import { verifyJWT } from './middlewares/verify-jwt';

async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  // Authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}

export { appRoutes };
