import { ILogger } from '../logger/logger';
import Logger from '../logger/logger';
import mongoose from 'mongoose';
import { IDBConnectionOptions } from './db-connection.interface';
import { Server } from '../../core/server';

const dbConnection = async (_server: Server, dbOptions: IDBConnectionOptions): Promise<void> => {
  const logger: ILogger = Logger.getInstance();

  try {
    mongoose.connection.on('connected', () => {
      logger.info({
        message: 'DB connection',
        data: { status: 'connected' },
      });
    });

    mongoose.connection.on('disconnected', () => {
      logger.info({
        message: 'DB connection',
        data: { status: 'disconnected' },
      });
    });

    const uri = dbOptions.uri;

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

  } catch (error) {
    logger.error({
      message: 'Error in DB Connection',
      data: {},
      error: error as Error,
    });
  }
};

export default dbConnection;
