import type { FastifyReply, FastifyRequest } from 'fastify';

import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case';

async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfilerUseCase = makeGetUserProfileUseCase();

  const { user } = await getUserProfilerUseCase.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}

export { profile };
