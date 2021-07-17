import Logger, { ILogger } from '../../../shared/logger/logger';
import User from '../../../shared/database/mongoose/models/user.model';
import { AuthenticationException } from '../../../shared/exceptions';
import { FastifyReply, FastifyRequest } from 'fastify';

export class AuthHooks {
  static verifyJWT = async (request: FastifyRequest, reply: FastifyReply<any>): Promise<void> => {
    const logger: ILogger = Logger.getInstance();

    try {
      if (!request.headers.authorization) {
        throw new AuthenticationException('Missing access token');
      }
      const token = request.headers.authorization?.split('Bearer ')[1];
      const user = await User.findByToken(token);

      if (!user?.code) {
        throw new AuthenticationException();
      }

      request.user = user;
      request.token = token;
    } catch (error) {
      logger.error({
        message: 'Error in AuthHook.verifyJWT',
        data: { },
        error: error as Error,
      });

      return reply.code(401).send(error);
    }
  };

  static verifyCredentials = async (request: FastifyRequest, reply: FastifyReply<any>): Promise<void> => {
    const logger: ILogger = Logger.getInstance();

    try {
      if (!request.body) {
        throw new AuthenticationException('Email and Password fields are required');
      }
      const user = await User.findByCredentials(
        (request.body as Record<string, string>).email,
        (request.body as Record<string, string>).password,
      );

      request.user = user;
    } catch (error) {
      logger.error({
        message: 'Error in AuthHook.verifyCredentials',
        data: { },
        error: error as Error,
      });
      void reply.code(400).send(error);
    }
  }
}
