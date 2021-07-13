import config from '../../../config';
import fastifySwaggerPlugin from 'fastify-swagger';
import { Server } from '../../server';

export class ApiDocsGeneratorPlugin {
  static bootstrap(server: Server, exposeRoute: boolean): void {
    const port = config.get().port;

    server.use(fastifySwaggerPlugin, {
      routePrefix: '/docs',
      swagger: {
        info: {
          title: 'Case Labeling Service',
          description: '',
          version: '0.1.0',
        },
        host: `localhost:${port}`,
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
          {
            name: 'Auth',
            description: 'Auth related end-points',// TODO:
          },
        ],
      },
      exposeRoute,
    });
  }
}
