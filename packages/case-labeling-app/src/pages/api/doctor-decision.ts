import axios from 'axios';
import withSession, { NextRequestWithSession, WithSessionType } from '../../lib/session';
import { DoctorDecision } from '../../interfaces/doctor-decision.interface';
import { User } from '../../interfaces/user.interface';
import { NextApiResponse } from 'next';

interface CreateDecisionQuery {
  token: string,
  doctorCode: string;
  caseCode: string;
  conditionCode: string;
  duration: number;
}

type ResponseError = {
  statusCode: 500,
  message: string,
}

export const createDoctorDecision = async (query: CreateDecisionQuery): Promise<DoctorDecision> => {
  try {
    const api: string = process.env.apiBaseUrl;
    const url = `${api}/doctor-decisions`;
    const { data } = await axios.post<DoctorDecision>(url, query, {
      headers: {
        'Authorization': `Bearer ${query.token}`,
      },
    });

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const handler = (async (req: NextRequestWithSession, res: NextApiResponse<DoctorDecision | ResponseError>) => {
  try {
    const user: User = req.session.get('user');
    const { caseCode, conditionCode, duration } = req.body as CreateDecisionQuery;
    const data = await createDoctorDecision({
      doctorCode: user.code,
      caseCode,
      conditionCode,
      duration,
      token: user.accessToken.token,
    });

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
