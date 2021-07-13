import { InfoMessage, ErrorMessage } from './messages';

interface ILogger {
  debug<T>(msg: InfoMessage<T>): void;
  info<T>(msg: InfoMessage<T>): void;
  warn<T>(msg: InfoMessage<T>): void;
  error<T>(msg: ErrorMessage<T>): void;
}

export default ILogger;
