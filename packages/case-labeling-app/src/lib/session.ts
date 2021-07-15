import { NextApiRequest, NextApiResponse } from 'next';
import { Session, SessionOptions, withIronSession } from 'next-iron-session';

export type NextRequestWithSession = NextApiRequest & { session: Session };
export type NextHandlerWithSession = (
  req: NextRequestWithSession,
  res: NextApiResponse,
) => void | Promise<void>;
export type WithSessionType = (...args: any[]) => Promise<any>

const cookieOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: 'case-labeling-session',
  cookieOptions: {
    httpOnly: process.env.NODE_ENV === 'production',
    secure: process.env.NODE_ENV === 'production',
  },
};

const withSession = (requestHandler: NextHandlerWithSession): WithSessionType =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  withIronSession(requestHandler, cookieOptions) as (...args: any[]) => Promise<any>;

export default withSession;
