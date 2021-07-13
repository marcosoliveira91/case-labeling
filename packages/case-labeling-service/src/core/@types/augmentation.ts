// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as fastify from 'fastify';
import { IUserDocument } from '../../shared/database/mongoose/models';

declare module 'fastify' {
  export interface FastifyRequest {
    user: IUserDocument;
    token: string;
  }
}
