import type { FastifyInstance } from 'fastify';

import { register } from './controllers/register';

async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
}

export { appRoutes };
