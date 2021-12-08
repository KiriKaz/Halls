import { NextApiRequest, NextApiResponse } from "next";

import client from '../../../lib/prisma';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const posts = await client.post.findMany({});

  return res.status(200).json(posts);
};

export default handler;