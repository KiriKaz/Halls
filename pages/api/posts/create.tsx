// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Post } from '.prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import jwt, { JwtPayload } from 'jsonwebtoken';

import { SECRET } from '../../../src/lib/config';

import client from '../../../src/lib/prisma';
import { getAuthHeader } from '../../../src/lib/auth';

type Error = {
  error: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Post | Error>) => {
  const { slug, content } = req.body;
  const token = getAuthHeader(req);

  if (token === null) return res.status(403).json({ error: 'USER_NOT_AUTHENTICATED ' });

  let verifiedToken;
  try {
    verifiedToken = jwt.verify(token, SECRET) as JwtPayload;
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }

  const stuff = await client.post.create({
    data: {
      slug,
      title: slug,
      content,
      userId: verifiedToken.id
    }
  });

  return res.status(201).json(stuff);
};


export default handler;