import axios from 'axios';
import withSession, { NextRequestWithSession, WithSessionType } from '../../lib/session';
import { Case } from '../../interfaces/case.interface';
import { User } from '../../interfaces/user.interface';
import { NextApiResponse } from 'next';

interface GetCasesQuery {
  token: string,
}

type ResponseError = {
  statusCode: 500,
  message: string,
}


export const getCases = async (query: GetCasesQuery): Promise<{ cases: Case[] }> => {
  try {
    const api: string = process.env.apiBaseUrl;
    const url = `${api}/cases`;
    const { data } = await axios.get<{ cases: Case[] }>(url, {
      headers: {
        'Authorization': `Bearer ${query.token}`,
      },
    });

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const handler = (async (req: NextRequestWithSession, res: NextApiResponse<{ cases: Case[] } | ResponseError>) => {
  try {
    const session: User = req.session.get('user');
    const data = await getCases({ token: session.accessToken.token });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: (error as Error).message,
    });
  }
});

const getCasesHandler: WithSessionType = withSession(handler);

export default getCasesHandler;
