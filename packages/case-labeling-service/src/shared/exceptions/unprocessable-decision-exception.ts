import { BaseException } from './base-exception';

class UnprocessableDecisionException extends BaseException {
  readonly code = 'UNPROCESSABLE_DECISION_ENTITY';

  constructor(message = 'Unprocessable Decision entity') {
    super(message);

    Object.setPrototypeOf(this, UnprocessableDecisionException.prototype);
  }
}

export { UnprocessableDecisionException };
