import { User } from '.prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import client from '../../../src/lib/prisma';

type Error = {
  error: string
};

import type { SessionToken } from '../../../src/types';

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

  const secret = process.env.SECRET ?? 'SET_YOUR_SECRET_KEY_DUDE';
  const signedToken = jwt.sign({ username }, secret);

  const sessionToken = { token: signedToken, username, pfp: registeredUser.pfp, id: registeredUser.id };

  res.status(200).json(sessionToken);
};


export default handler;