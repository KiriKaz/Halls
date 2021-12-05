import { User } from '.prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { SECRET } from '../../../lib/config';
import client from '../../../lib/prisma';

type Error = {
  error: string
};

import type { SessionToken } from '../../../types';

const handler = async (req: NextApiRequest, res: NextApiResponse<Error | SessionToken>) => {
  const { username, password } = req.body;

  const registeredUser = await client.user.findFirst({
    where: {
      username
    }
  });

  if (registeredUser === null) return res.status(400).json({ error: 'USER_NOT_FOUND' });

  const passwordCorrect = await bcrypt.compare(password, registeredUser.password);

  if (!passwordCorrect) return res.status(403).json({ error: 'PASSWORD_INCORRECT ' });

  const signedToken = jwt.sign({ id: registeredUser.id }, SECRET);

  const sessionToken = { token: signedToken, username, pfp: registeredUser.pfp, id: registeredUser.id };

  res.status(200).json(sessionToken);
};


export default handler;