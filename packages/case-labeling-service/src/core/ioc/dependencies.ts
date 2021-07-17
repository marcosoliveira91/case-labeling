import AuthController from '../../modules/auth/auth.controller';
import AuthRepository from '../../modules/auth/auth.repository';
import AuthService from '../../modules/auth/auth.service';
import CaseController from '../../modules/case/case.controller';
import CaseRepository from '../../modules/case/case.repository';
import CaseService from '../../modules/case/case.service';
import ConditionController from '../../modules/health-condition/condition.controller';
import ConditionRepository from '../../modules/health-condition/condition.repository';
import ConditionService from '../../modules/health-condition/condition.service';
import DoctorDecisionController from '../../modules/doctor-decision/doctor-decision.controller';
import DoctorDecisionRepository from '../../modules/doctor-decision/doctor-decision.repository';
import DoctorDecisionService from '../../modules/doctor-decision/doctor-decision.service';
import Logger from '../../shared/logger/logger';
import { ClassDependencies } from './types/index';

const logger = Logger.getInstance();

const dependencies: ClassDependencies[] = [
  {
    clss: AuthController,
    dependencies: ['IAuthService'],
  },
  {
    clss: ['IAuthService', AuthService],
    dependencies: ['IAuthRepository'],
  },
  {
    clss: ['IAuthRepository', AuthRepository],
    dependencies: ['ILogger'],
  },
  {
    clss: CaseController,
    dependencies: ['ICaseService'],
  },
  {
    clss: ['ICaseService', CaseService],
    dependencies: ['ICaseRepository'],
  },
  {
    clss: ['ICaseRepository', CaseRepository],
    dependencies: ['ILogger'],
  },
  {
    clss: ConditionController,
    dependencies: ['IConditionService'],
  },
  {
    clss: ['IConditionService', ConditionService],
    dependencies: ['IConditionRepository'],
  },
  {
    clss: ['IConditionRepository', ConditionRepository],
    dependencies: ['ILogger'],
  },
  {
    clss: DoctorDecisionController,
    dependencies: ['IDoctorDecisionService'],
  },
  {
    clss: ['IDoctorDecisionService', DoctorDecisionService],
    dependencies: ['IDoctorDecisionRepository', 'ICaseRepository'],
  },
  {
    clss: ['IDoctorDecisionRepository', DoctorDecisionRepository],
    dependencies: ['ILogger'],
  },
  // {
  //   constant: ['CacheHelper', cacheHelper], // TODO: add cache decorator to fetch Conditions
  // },
  {
    constant: ['ILogger', logger],
  },
];

export default dependencies;
