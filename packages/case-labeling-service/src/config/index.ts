import convict from 'convict';
import { IConfig } from './config.interface';

const config = convict<IConfig>({
  env: {
    arg: 'env',
    default: 'development',
    doc: 'Application environment',
    env: 'NODE_ENV',
    format: ['development', 'test', 'production'],
  },
  port: {
    arg: 'port',
    default: 3001,
    doc: 'Port to bind',
    env: 'SERVER_PORT',
    format: 'port',
  },
  cors: {
    originRegex: {
      default: 'localhost',
      env: 'CORS_ORIGIN_REGEX',
    },
    credentials: {
      default: true,
    },
  },
  auth: {
    jwt: {
      secret: {
        default: '',
        env: 'AUTH_JWT_SECRET',
      },
    },
  },
  db: {
    connection: {
      uri: {
        default: '',
        env: 'DB_URI',
      },
    },
  },
});

config.validate({ allowed: 'strict' });

export default config;
