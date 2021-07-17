import config from '../config';
import dbConnector from '../shared/database/db-connection';
import {
  ApiDocsGeneratorPlugin,
  ApiHealthCheckPlugin,
  AuthPlugin,
  CorsPlugin,
} from './bootstrap/plugins';
import { DI } from './bootstrap/di';
import { Hooks } from './bootstrap/hooks/hooks';
import { IConfig } from '../config/config.interface';
import { IocContainer } from './ioc/container';
import { Routes } from './bootstrap/routes';
import { Server } from './server';
import 'reflect-metadata';

const main = async () => {
  const configuration: IConfig = config.get();
  const iocContainer: IocContainer = new IocContainer();
  const server: Server = new Server();

  /* Bootstrap IoC Container */
  DI.bootstrap(iocContainer);

  /* Bootstrap Server */
  ApiDocsGeneratorPlugin.bootstrap(server, configuration.env !== 'production');
  ApiHealthCheckPlugin.bootstrap(server);
  CorsPlugin.bootstrap(server);
  AuthPlugin.bootstrap(server);
  Routes.bootstrap(server, iocContainer);
  Hooks.bootstrap(server);

  /* Connect DB */
  await dbConnector(server, configuration.db.connection);

  /* Init Server */
  server.init(configuration.port);
};

void main();
