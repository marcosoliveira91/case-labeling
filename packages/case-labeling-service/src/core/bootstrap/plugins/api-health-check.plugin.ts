import { Server } from '../../server';
import fastifyHealthCheckPlugin from 'fastify-healthcheck';

export class ApiHealthCheckPlugin {
  static bootstrap(server: Server): void {
    server.use(fastifyHealthCheckPlugin, { healthcheckUrl: '/health' });
  }
}
