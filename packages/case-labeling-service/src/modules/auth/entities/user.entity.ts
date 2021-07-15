export interface User {
  code: string;
  email: string;
  name: string;
  password: string;
  tokens: Array<{token: string}>
}
