import Logger from '../../shared/logger/logger';
import { ClassDependencies } from './types/index';

const logger = Logger.getInstance();

const dependencies: ClassDependencies[] = [
  // {
  //   clss: AuthController,
  //   dependencies: ['IAuthService'],
  // },
  // {
  //   clss: ['IAuthService', AuthService],
  //   dependencies: ['IAuthRepository'],
  // },
  // {
  //   clss: ['IAuthRepository', AuthRepository],
  //   dependencies: ['ILogger'],
  // },
  {
    constant: ['ILogger', logger],
  },
];

export default dependencies;
