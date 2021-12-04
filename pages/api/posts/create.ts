// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Post } from '.prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string
}


import client from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse<Post>) => {
  const { slug, content } = req.body;

  const stuff = await client.post.create({
    data: {
      slug,
      title: slug,
      content,
      userId: 'Black Moon'
    }
  });

  res.status(200).json(stuff);
};


export default handler;