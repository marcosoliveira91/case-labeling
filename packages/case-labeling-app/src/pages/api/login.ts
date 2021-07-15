import axios from 'axios';
import withSession, { NextRequestWithSession, WithSessionType } from '../../lib/session';
import { User } from '../../interfaces/user.interface';
import type { NextApiResponse } from 'next';

type ResponseError = {
    statusCode: 500,
    message: string,
}

type LoginResponse = {
  user: User
}

type LoggedInUser = User & { isLoggedIn: boolean };

type LoginQuery = {
  email: string;
  password: string;
}


export const login = async (query: LoginQuery): Promise<LoginResponse> => {
  try {
    const api: string = process.env.apiBaseUrl;
    const url = `${api}/auth/login`;
    const { data } = await axios.post<LoginResponse>(url, query, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const handler = (async (req: NextRequestWithSession, res: NextApiResponse<LoggedInUser | ResponseError>) => {
  try {
    const { email, password } = req.body as LoginQuery;
    const { user } = await login({
      email,
      password,
    });

    const loggedUser = {
      isLoggedIn: true,
      ...user,
    };

    req.session.set('user', loggedUser);
    await req.session.save();

    res.status(200).json(loggedUser);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: (error as Error).message,
    });
  }
});

const loginHandler: WithSessionType = withSession(handler);

export default loginHandler;
