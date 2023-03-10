import type { FastifyInstance } from 'fastify';

import { authenticate } from './controllers/authenticate';
import { register } from './controllers/register';

async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);
}

export { appRoutes };
