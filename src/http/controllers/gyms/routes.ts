import type { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';

async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);
}

export { gymsRoutes };
