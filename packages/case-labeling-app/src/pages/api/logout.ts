import axios from 'axios';
import withSession, { NextRequestWithSession, WithSessionType } from '../../lib/session';
import type { NextApiResponse } from 'next';
import { User } from 'case-labeling-app/src/interfaces/user.interface';

type ResponseError = {
    statusCode: 500,
    message: string,
}

type LogOutResponse = {
  user: User,
}

type LogOutQuery = {
  token: string,
}

type LoggedOutUser = User & { isLoggedIn: boolean };

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
    const { accessToken } = req.session.get('user') as User;
    const { user } = await logout({ token: accessToken.token });

    const loggedOutUser = {
      isLoggedIn: false,
      ...user,
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
