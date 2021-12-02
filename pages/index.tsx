import type { NextPage } from 'next';
import Head from 'next/head';
import { PrismaClient } from '@prisma/client';

export const client = new PrismaClient();

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Wander the Halls</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Home;