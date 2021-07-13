/* eslint-disable @typescript-eslint/no-unsafe-member-access */
jest.mock('pino', () => {
  const Pino = jest.fn().mockReturnValue({
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  });

  (Pino as any).destination = jest.fn();
  (Pino as any).stdTimeFunctions = {
    isoTime: jest.fn(),
  };

  return Pino;
});

import Logger from '../logger';
import pino from 'pino';

beforeEach(jest.clearAllMocks);

describe('Logger', () => {
  describe('getInstance()', () => {
    it ('should create a new pino instance', () => {
      const spy = pino as unknown as jest.Mock;

      Logger.getInstance();

      expect(spy).toHaveBeenCalledTimes(2);
    });

    it ('should return always the same logger instance', () => {
      const logger1 = Logger.getInstance();
      const logger2 = Logger.getInstance();

      expect(logger1).toBe(logger2);
    });
  });

  describe('log functions', () => {

    describe('debug()', () => {
      it ('should call pino instance debug function', () => {
        Logger.getInstance().debug<string>({
          message: 'foo',
          data: 'bar',
        });

        expect(pino().debug).toHaveBeenCalledTimes(2);
        expect(pino().debug).toHaveBeenCalledWith({
          message: 'foo',
          data: 'bar',
        });
      });
    });

    describe('info()', () => {
      it ('should call pino instance info function', () => {
        Logger.getInstance().info<string>({
          message: 'foo',
          data: 'bar',
        });

        expect(pino().info).toHaveBeenCalledTimes(2);
        expect(pino().info).toHaveBeenCalledWith({
          message: 'foo',
          data: 'bar',
        });
      });
    });

    describe('warn()', () => {
      it ('should call pino instance warn function', () => {
        Logger.getInstance().warn<string>({
          message: 'foo',
          data: 'bar',
        });

        expect(pino().warn).toHaveBeenCalledTimes(2);
        expect(pino().warn).toHaveBeenCalledWith({
          message: 'foo',
          data: 'bar',
        });
      });
    });

    describe('error()', () => {
      it ('should call pino instance error function', () => {
        const error = new Error();

        Logger.getInstance().error<string>({
          message: 'foo',
          data: 'bar',
          error,
        });

        expect(pino().error).toHaveBeenCalledTimes(2);
        expect(pino().error).toHaveBeenCalledWith({
          message: 'foo',
          data: 'bar',
          error: {
            message: error.message,
            stack: error.stack,
          },
        });
      });
    });
  });
});
