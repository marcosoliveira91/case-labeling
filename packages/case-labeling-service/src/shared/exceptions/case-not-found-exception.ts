import { BaseException } from './base-exception';

class CaseNotFoundException extends BaseException {
  readonly code = 'CASE_NOT_FOUND';

  constructor(code: string) {
    super(`Case ${code} not found`);

    Object.setPrototypeOf(this, CaseNotFoundException.prototype);
  }
}

export { CaseNotFoundException };
