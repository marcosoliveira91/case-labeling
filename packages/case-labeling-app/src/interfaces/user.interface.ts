export interface User {
  code: string;
  name: string;
  email: string;
  accessToken: {
    id: string;
    token: string;
  };
}
