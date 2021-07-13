import config from '../../config';
import ILogger from '../../shared/logger/logger.interface';
import Logger from '../../shared/logger/logger';
import { BaseException } from '../../shared/exceptions/base-exception';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { Server } from '../server';

type ReplyErrorPayload<T extends FastifyError | BaseException> = Pick<T, 'code' | 'message'>;

export class Hooks {
  static bootstrap(server: Server): void {
    server.addOnRequestHook(Hooks.onRequestHandler);
    server.addOnErrorHook(Hooks.onErrorHandler);
  }

  static onRequestHandler = (
    request: FastifyRequest,
    _reply: FastifyReply<any>,
    done: () => any
  ): void => {
    const logger: ILogger = Logger.getInstance();

    logger.debug({
      message: 'request incoming',
      data: {
        request: {
          method: request.method,
          url: request.url,
          path: request.hostname,
          parameters: request.params,
          body: request.body,
        },
      },
    });
    done();
  };

  static onErrorHandler = (
    error: FastifyError | BaseException,
    request: FastifyRequest,
    reply: FastifyReply<any>,
  ): void => {
    const logger: ILogger = Logger.getInstance();

    logger.error({
      message: 'request error',
      error,
      data: {
        request: {
          method: request.method,
          url: request.url,
          path: request.hostname,
          parameters: request.params,
          body: request.body,
        },
        reply: {
          responseTime: reply.getResponseTime(),
        },
      },
    });

    if(error instanceof BaseException) {
      const payload = Hooks.handleBaseExceptionReply(error, reply);

      void reply.send(payload);
      return;
    }

    if(error.validation) {
      const payload = Hooks.handleSchemaValidationException(error);

      void reply.send(payload);
      return;
    }

    void reply.send({
      code: 'INTERNAL_ERROR',
      message: 'Internal Server Error',
      stack: config.get().env !== 'production' && error.stack,
    });
  };

  private static handleBaseExceptionReply(error: BaseException, reply: FastifyReply<any>): ReplyErrorPayload<BaseException> {
    /** domain/app exceptions that require status code updates goes here */
    switch (error.constructor) {
    // TODO: domain/app exceptions that require status code updates goes here
    default:
      void reply.send({
        code: 'INTERNAL_ERROR',
        message: 'Internal Server Error',
        stack: config.get().env !== 'production' && error.stack,
      });
      break;
    }

    return {
      code: error.code,
      message: error.message,
    };
  }

  private static handleSchemaValidationException(error: FastifyError): ReplyErrorPayload<FastifyError> {
    return {
      code: 'BAD_REQUEST',
      message: error.message,
    };
  }
}
