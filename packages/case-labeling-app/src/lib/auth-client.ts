import axios from 'axios';
import { LoggedInUser } from '../interfaces/logged-in-user.interface';

type LoginQuery = {
  email: string;
  password: string;
}

class AuthClient {
  public static async login (query: LoginQuery): Promise<LoggedInUser> {
    try {
      const url = '/api/login';
      const { data } = await axios.post<LoggedInUser>(url, query);

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  public static async logout (): Promise<void> {
    try {
      const url = '/api/logout';

      void await axios.post(url);
    } catch (error) {
      throw new Error(error);
    }
  }
}


export default AuthClient;
