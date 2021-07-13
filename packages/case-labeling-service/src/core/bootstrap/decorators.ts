import User from '../../shared/database/mongoose/models/user.model';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Server } from '../server';

export class Decorators {
  static bootstrap(server: Server): void {
    server.decorate('db', {
      models: {
        User,
      },
    });
    server.decorate('verifyJWT', Decorators.verifyJWT);
    server.decorate('verifyCredentials', Decorators.verifyCredentials);
  }

  static verifyJWT = async (request: FastifyRequest, reply: FastifyReply<any>): Promise<void> => {
    // const logger: ILogger = Logger.getInstance();
    try {
      if (!request.headers.authorization) {
        throw new Error('No access token was sent');
      }
      const token = request.headers.authorization?.split('Bearer ')[1];
      const user = await User.findByToken(token);

      if (!user) {
        // handles logged out user with valid token
        throw new Error('Authentication failed!');
      }

      request.user = user;
      request.token = token; // used in logout route
    } catch (error) {
      return reply.code(401).send(error);
    }
  };

  static verifyCredentials = async (request: FastifyRequest, reply: FastifyReply<any>): Promise<void> => {
    try {
      if (!request.body) {
        throw new Error('Email and Password fields are required!');
      }
      const user = await User.findByCredentials(
        (request.body as Record<string, string>).email,
        (request.body as Record<string, string>).password,
      );

      request.user = user;
    } catch (error) {
      void reply.code(400).send(error);
    }
  }
}
