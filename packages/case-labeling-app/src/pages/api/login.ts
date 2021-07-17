import axios from 'axios';
import withSession, { NextRequestWithSession, WithSessionType } from '../../lib/session';
import { LoggedInUser } from '../../interfaces/logged-in-user.interface';
import type { NextApiResponse } from 'next';

type ResponseError = {
    statusCode: 500,
    message: string,
}

type LoginResponse = {
  user: {
    code: string;
    name: string;
    email: string;
    tokens: Array<{ token: string, _id: string }>;
  }
}

type LoginQuery = {
  email: string;
  password: string;
}


const login = async (query: LoginQuery): Promise<LoginResponse> => {
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

    const { code, name, tokens } = user;
    const accessToken = tokens.pop();
    const loggedUser: LoggedInUser = {
      code,
      email,
      name,
      accessToken: {
        id: accessToken._id,
        token: accessToken.token,
      }, // in the futue, use deviceId
      isLoggedIn: true,
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
