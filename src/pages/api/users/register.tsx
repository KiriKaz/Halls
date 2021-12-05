import { User } from '.prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import bcrypt from 'bcrypt';

import client from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { username, email, password } = req.body;
  const hashedPw = await bcrypt.hash(password, 10);

  const registeredUser = await client.user.create({
    data: {
      username,
      password: hashedPw
    }
  });


  res.status(201).json(registeredUser);
};


export default handler;