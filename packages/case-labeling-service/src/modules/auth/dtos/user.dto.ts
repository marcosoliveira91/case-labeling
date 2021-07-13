export interface UserDto {
  // code: string;
  email: string;
  name: string;
  password: string;
  tokens: Array<{token: string}>
}
