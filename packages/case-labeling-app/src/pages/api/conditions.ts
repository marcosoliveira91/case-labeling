import axios from 'axios';
import withSession, { NextRequestWithSession, WithSessionType } from '../../lib/session';
import { Condition } from '../../interfaces/condition.interface';
import { User } from '../../interfaces/user.interface';
import { NextApiResponse } from 'next';

interface GetConditionsQuery {
  token: string,
}

type ResponseError = {
  statusCode: 500,
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
    throw new Error(error);
  }
};

const handler = (async (req: NextRequestWithSession, res: NextApiResponse<{ conditions: Condition[] } | ResponseError>) => {
  try {
    const session: User = req.session.get('user');
    const data = await getConditions({ token: session.accessToken.token });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: (error as Error).message,
    });
  }
});

const getConditionsHandler: WithSessionType = withSession(handler);

export default getConditionsHandler;
