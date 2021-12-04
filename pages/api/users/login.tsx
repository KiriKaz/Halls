import { User } from '.prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import client from '../../../lib/prisma';

type Error = {
  error: string
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Error | string>) => {
  const { username, password } = req.body;

  const registeredUser = await client.user.findFirst({
    where: {
      username
    }
  });

  if (registeredUser === null) {
    res.status(400).json({ error: 'USER_NOT_FOUND' });
    return;  // So the intellisense doesn't yell at us
  }

  const passwordCorrect = await bcrypt.compare(password, registeredUser.password);

  if (!passwordCorrect) {
    res.status(403).json({ error: 'PASSWORD_INCORRECT ' });
    return;
  }

  const secret = process.env.SECRET ?? 'SET_YOUR_SECRET_KEY_DUDE';
  const signedToken = jwt.sign({ username }, secret);


  res.status(200).json(signedToken);
};


export default handler;