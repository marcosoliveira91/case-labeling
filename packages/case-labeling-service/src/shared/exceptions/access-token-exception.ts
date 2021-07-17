import { BaseException } from './base-exception';

class AccessTokenException extends BaseException {
  readonly code = 'INVALID_ACCESS_TOKEN';

  constructor(message = 'Invalid Access Token') {
    super(message);

    Object.setPrototypeOf(this, AccessTokenException.prototype);
  }
}

export { AccessTokenException };
