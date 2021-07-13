import AuthController from '../../modules/auth/auth.controller';
import ConditionController from '../../modules/condition/condition.controller';
import { IocContainer } from '../ioc/container';
import { Server } from '../server';
import { AuthHooks } from './hooks/auth-hooks';

export class Routes {
  static bootstrap(server: Server, container: IocContainer): void {
    const authController = container.get(AuthController);
    const conditionController = container.get(ConditionController);

    server.setRoute('post', '/auth/register', authController.register, /* { schema: schemas.registerSchema }*/);
    server.setRoute('post', '/auth/signin', authController.login, {
      preHandler: AuthHooks.verifyCredentials,
      // schema: schemas.signinSchema
    });
    server.setRoute('post', '/auth/logout', authController.logout, {
      preHandler: AuthHooks.verifyJWT,
      // schema: schemas.signinSchema
    });

    server.setRoute('get', '/conditions', conditionController.getConditions,
      {
        // preHandler: AuthHooks.verifyJWT,
        // schema: schemas.getConditionsSchema
      }
    );
  }
}
