/* eslint-disable @typescript-eslint/naming-convention */
import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string;
      role: 'ADMIN' | 'MEMBER';
    };
  }
}
