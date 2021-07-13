import fastifyAuthPlugin from 'fastify-auth';
import { Server } from '../../server';

export class AuthPlugin {
  static bootstrap(server: Server): void {
    server.use(fastifyAuthPlugin);
  }
}
