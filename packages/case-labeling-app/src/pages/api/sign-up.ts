import axios from 'axios';
import withSession, { NextRequestWithSession, WithSessionType } from '../../lib/session';
import { RegisteredUser } from '../../interfaces/registered-user.interface';
import type { NextApiResponse } from 'next';

type ResponseError = {
    statusCode: 500,
    message: string,
}

type SignUpResponse = {
  user: {
    code: string;
    name: string;
    email: string;
    tokens: Array<{ token: string, _id: string }>;
  }
}

type SignUpQuery = {
  email: string;
  name: string;
  password: string;
}


export const signUp = async (query: SignUpQuery): Promise<SignUpResponse> => {
  try {
    const api: string = process.env.apiBaseUrl;
    const url = `${api}/auth/register`;
    const { data } = await axios.post<SignUpResponse>(url, query, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const handler = (async (req: NextRequestWithSession, res: NextApiResponse<RegisteredUser | ResponseError>) => {
  try {
    const { email, password, name } = req.body as SignUpQuery;
    const { user } = await signUp({
      email,
      password,
      name,
    });

    const { code, tokens } = user;
    const accessToken = tokens.pop();
    const registeredUser: RegisteredUser = {
      isLoggedIn: false,
      code,
      name,
      email,
      accessToken: {
        id: accessToken._id,
        token: accessToken.token,
      }, // in the futue, use deviceId
    };

    req.session.set('user', registeredUser);
    await req.session.save();

    res.status(200).json(registeredUser);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: (error as Error).message,
    });
  }
});

const signUpHandler: WithSessionType = withSession(handler);

export default signUpHandler;
