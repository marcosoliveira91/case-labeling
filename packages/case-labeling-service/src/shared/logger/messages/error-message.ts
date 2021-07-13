import { InfoMessage } from './info-message';

export interface ErrorMessage<T> extends InfoMessage<T> {
  message: string;
  error: Error;
  data: T;
}
