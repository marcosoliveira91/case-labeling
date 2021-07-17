import AuthController from '../../modules/auth/auth.controller';
import CaseController from '../../modules/case/case.controller';
import DoctorDecisionController from '../../modules/doctor-decision/doctor-decision.controller';
import HealthConditionController from '../../modules/health-condition/condition.controller';
import { AuthHooks } from './hooks/auth-hooks';
import { IocContainer } from '../ioc/container';
import { Server } from '../server';

export class Routes {
  static bootstrap(server: Server, container: IocContainer): void {
    const authController = container.get(AuthController);
    const healthConditionController = container.get(HealthConditionController);
    const doctorDecisionController = container.get(DoctorDecisionController);
    const caseController = container.get(CaseController);

    server.setRoute('post', '/auth/register', authController.register, /* { schema: schemas.registerSchema }*/);
    server.setRoute('post', '/auth/login', authController.login, {
      preHandler: AuthHooks.verifyCredentials,
      // schema: schemas.loginSchema
    });
    server.setRoute('post', '/auth/logout', authController.logout, {
      preHandler: AuthHooks.verifyJWT,
      // schema: schemas.logoutSchema
    });

    // cachable request
    server.setRoute('get', '/health-conditions', healthConditionController.getConditions,
      {
        preHandler: AuthHooks.verifyJWT,
        // schema: schemas.getConditionsSchema
      }
    );

    server.setRoute('post', '/doctor-decisions', doctorDecisionController.createDoctorDecision,
      {
        preHandler: AuthHooks.verifyJWT,
        // schema: schemas.createDoctorDecisionSchema
      }
    );

    server.setRoute('get', '/cases', caseController.getNonReviewedCases,
      {
        preHandler: AuthHooks.verifyJWT,
        // schema: schemas.getNonReviewedCasesSchema
      }
    );
  }
}
