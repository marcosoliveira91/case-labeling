import AuthController from '../../modules/auth/auth.controller';
import AuthRepository from '../../modules/auth/auth.repository';
import AuthService from '../../modules/auth/auth.service';
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
    constant: ['ILogger', logger],
  },
];

export default dependencies;
