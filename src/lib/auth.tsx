import { NextApiRequest } from "next";

export const getAuthHeader = (req: NextApiRequest) => {
  let token: string | null = null;
  const auth = req.headers.authorization;
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    token = auth.substring(7);
  }

  return token;
};