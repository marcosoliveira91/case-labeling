import { BaseException } from './base-exception';

class AuthenticationException extends BaseException {
  readonly code = 'AUTHENTICATION_FAILED';

  constructor(message = 'Authentication Failed') {
    super(message);

    Object.setPrototypeOf(this, AuthenticationException.prototype);
  }
}

export { AuthenticationException };
