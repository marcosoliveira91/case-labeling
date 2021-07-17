import Hashids from 'hashids/cjs';

export type GenerateReadbleCodeProps = {
  salt: string;
  encoder?: number;
  length?: number;
};

const generateReadableCode = ({ salt, encoder, length }: GenerateReadbleCodeProps): string => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const hash: Hashids = new Hashids(salt, length, alphabet);

  return hash.encode(encoder ?? new Date().getTime());
};

const decodeReadableCode = (salt: string, code: string): number => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const hash: Hashids = new Hashids(salt, 10, alphabet);

  return hash.decode(code)[0] as number;
};

export {
  generateReadableCode,
  decodeReadableCode,
};
