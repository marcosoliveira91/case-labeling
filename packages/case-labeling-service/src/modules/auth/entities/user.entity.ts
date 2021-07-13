export interface User {
  email: string;
  name: string;
  password: string;
  tokens: Array<{token: string}>
}
