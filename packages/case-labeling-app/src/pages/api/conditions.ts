import axios, { AxiosError } from 'axios';
import withSession, { NextRequestWithSession, WithSessionType } from '../../lib/session';
import { Condition } from '../../interfaces/condition.interface';
import { NextApiResponse } from 'next';
import { ServerResponseError } from '../../interfaces/server-response-error.interface';
import { User } from '../../interfaces/user.interface';

interface GetConditionsQuery {
  token: string,
}

type ResponseError = {
  statusCode: 500 | 401,
  message: string,
}


export const getConditions = async (query: GetConditionsQuery): Promise<{ conditions: Condition[] }> => {
  try {
    const api: string = process.env.apiBaseUrl;
    const url = `${api}/health-conditions`;
    const { data } = await axios.get<{ conditions: Condition[] }>(url, {
      headers: {
        'Authorization': `Bearer ${query.token}`,
      },
    });

    return data;
  } catch (error) {
    const response = (error as AxiosError).response;
    const errorData = response?.data as ServerResponseError;

    throw new Error(errorData.code);
  }
};

const handler = (async (req: NextRequestWithSession, res: NextApiResponse<{ conditions: Condition[] } | ResponseError>) => {
  try {
    const session: User = req.session.get('user');
    const data = await getConditions({ token: session?.accessToken?.token });

    res.status(200).json(data);
  } catch (error) {
    if((error as Error).message === 'INVALID_ACCESS_TOKEN') {
      req.session.destroy();

      return res.status(401).json({
        statusCode: 401,
        message: (error as Error).message,
      });
    }

    return res.status(500).json({
      statusCode: 500,
      message: (error as Error).message,
    });
  }
});

const getConditionsHandler: WithSessionType = withSession(handler);

export default getConditionsHandler;
