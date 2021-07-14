import Hashids from 'hashids/cjs';

const generateReadableCode = (salt: string, encoder?: number): string => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const hash: Hashids = new Hashids(salt, 10, alphabet);

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
