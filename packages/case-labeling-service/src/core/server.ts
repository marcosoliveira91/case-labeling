import Logger from '../shared/logger/logger';
import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
  FastifyError,
  FastifyRegisterOptions,
  FastifyPluginOptions,
  FastifyPluginCallback,
  onRequestHookHandler,
  RouteShorthandOptions,
  RouteHandler,
  FastifyPluginAsync,
} from 'fastify';

type Verb = 'get' | 'post' | 'put' | 'patch';
type HookHandler = onRequestHookHandler;
type HookErrorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply<any>,
) => void;

export class Server {
  private readonly instance: FastifyInstance;

  constructor() {
    this.instance = fastify();
  }

  init(port = 0): void {
    const logger = Logger.getInstance();

    void this.instance.listen(port, '::')
      .then(() => logger.info({
        message: `Server listening on port ${port}`,
        data: {
          status: 'connected',
        },
      }))
      .catch((error: Error) => {
        logger.error({
          message: 'Error in Server.init',
          data: {},
          error ,
        });
      });
  }

  setRoute<T>(verb: Verb, route: string, handler: RouteHandler<T>, opts?: RouteShorthandOptions): void {
    if (!opts) {
      this.instance[verb]<T>(route, handler);
      return;
    }

    this.instance[verb]<T>(route, opts, handler);
  }

  use(plugin: FastifyPluginCallback | FastifyPluginAsync, opts?: FastifyRegisterOptions<FastifyPluginOptions>): void {
    void this.instance.register(plugin, opts);
  }

  addOnRequestHook(handler: HookHandler): void {
    this.instance.addHook('preHandler', handler);
  }

  addOnErrorHook(handler: HookErrorHandler): void {
    this.instance.setErrorHandler(handler);
  }

  decorate(property: string, value: unknown): void {
    this.instance.decorate(property, value);
  }
}
