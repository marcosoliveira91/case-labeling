import { Server } from '../../server';
import fastifyCorsPlugin from 'fastify-cors';
import config from '../../../config';

export class CorsPlugin {
  static bootstrap(server: Server): void {
    const { cors } = config.get();

    server.use(fastifyCorsPlugin, {
      origin: (origin: string, callback: (err: Error | null, allow?: boolean) => void) => {

        if (new RegExp(cors.originRegex, 'i').test(origin) || !origin) {
          callback(null, true);
          return;
        }
        callback(new Error('Cross-Origin Request Blocked'));
      },
      credentials: cors.credentials,
    });
  }
}
