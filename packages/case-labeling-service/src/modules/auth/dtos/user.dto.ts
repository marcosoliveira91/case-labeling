export interface UserDto {
  email: string;
  name: string;
  password: string;
  tokens: Array<{token: string}>
}
