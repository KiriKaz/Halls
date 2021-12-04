// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Post } from '.prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import client from '../../../src/lib/prisma';

type Error = {
  error: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Post | Error>) => {
  const { slug, content, userId } = req.body;

  if (userId === null) return res.status(403).json({ error: 'USER_NOT_AUTHENTICATED' });  // TODO I FEEL VERY SILLY, NEED TO SPEND A COUPLE HOURS ONLY OPTIMIZING FOR ERROR HANDLING AND THEN ALSO FOR AUTHORIZATION.

  const stuff = await client.post.create({
    data: {
      slug,
      title: slug,
      content,
      userId
    }
  });

  return res.status(201).json(stuff);
};


export default handler;