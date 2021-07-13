import AuthController from '../../modules/auth/auth.controller';
import AuthRepository from '../../modules/auth/auth.repository';
import AuthService from '../../modules/auth/auth.service';
import ConditionController from '../../modules/condition/condition.controller';
import ConditionRepository from '../../modules/condition/condition.repository';
import ConditionService from '../../modules/condition/condition.service';
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
  // {
  //   constant: ['CacheHelper', cacheHelper], // TODO: add cache decorator to fetch Conditions
  // },
  {
    constant: ['ILogger', logger],
  },
];

export default dependencies;
