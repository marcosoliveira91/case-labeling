// import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseError = {
    statusCode: 500,
    message: string,
}

const handler = async (_req: NextApiRequest, res: NextApiResponse<{ result: string } | ResponseError>): Promise<void>  => {
  try {
    const data = await Promise.resolve({ result: ''});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: (err as Error).message,
    });
  }
};

export default handler;
