import AuthController from '../../modules/auth/auth.controller';
import { IocContainer } from '../ioc/container';
import { Server } from '../server';
import { AuthHooks } from './hooks/auth-hooks';
// import User from '../../shared/database/mongoose/models/user.model';
// import { Decorators } from './decorators';

export class Routes {
  static bootstrap(server: Server, container: IocContainer): void {
    const authController = container.get(AuthController);

    server.setRoute('post', '/auth/register', authController.register, /* { schema: schemas.registerSchema }*/);
    server.setRoute('post', '/auth/signin', authController.login, {
      preHandler: AuthHooks.verifyCredentials,
      // schema: schemas.signinSchema
    });
    server.setRoute('post', '/auth/logout', authController.logout, {
      preHandler: AuthHooks.verifyJWT,
      // schema: schemas.signinSchema
    });

    // test route to check authentication validation is working
    server.setRoute('get', '/ping',
      async (req, reply) => {
        void reply.send({ ping: 'pong' });
      },
      {
        preHandler: AuthHooks.verifyJWT,
      }
    );
  }
}
