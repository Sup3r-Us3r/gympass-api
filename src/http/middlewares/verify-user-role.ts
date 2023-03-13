import { FastifyRequest, FastifyReply } from 'fastify';

function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

    if (role !== roleToVerify) {
      return reply.status(401).send({ message: 'Unauthorized.' });
    }
  };
}

export { verifyUserRole };
