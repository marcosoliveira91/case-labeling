import axios from 'axios';
import withSession, { NextRequestWithSession, WithSessionType } from '../../lib/session';
import { LoggedOutUser } from '../../interfaces/logged-out-user.interface';
import { User } from '../../interfaces/user.interface';
import { NextApiResponse } from 'next';

type ResponseError = {
    statusCode: 500,
    message: string,
}

type LogOutResponse = {
  user: {
    code: string;
    name: string;
    email: string;
    tokens: Array<{ token: string, _id: string }>;
  }
}

type LogOutQuery = {
  token: string,
}

export const logout = async (query: LogOutQuery): Promise<LogOutResponse> => {
  try {
    const api: string = process.env.apiBaseUrl;
    const url = `${api}/auth/logout`;
    const { data } = await axios.post<LogOutResponse>(url, {}, {
      headers: {
        'Authorization': `Bearer ${query.token}`,
        'Content-Type': 'application/json',
      },
    });

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const handler = (async (req: NextRequestWithSession, res: NextApiResponse<LoggedOutUser | ResponseError>) => {
  try {
    const session: User = req.session.get('user');
    const { user } = await logout({ token: session.accessToken.token });

    const { code, name, email } = user;
    const loggedOutUser: LoggedOutUser = {
      code,
      email,
      name,
      isLoggedIn: false,
    };

    req.session.destroy();

    res.status(200).json(loggedOutUser);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: (error as Error).message,
    });
  }
});

const logoutHandler: WithSessionType = withSession(handler);

export default logoutHandler;
