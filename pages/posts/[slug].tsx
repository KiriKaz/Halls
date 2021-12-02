import { PrismaClient } from '.prisma/client';
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { client } from '../index';


interface Params extends ParsedUrlQuery {
  slug: string
}

export const getServerSideProps: GetServerSideProps<any, Params> = async (context) => {  // Identify how to type this. Prisma type from model.
  const { slug } = context.params!;

  const post = await client.post.findFirst({
    where: {
      slug
    }
  });

  if (post === null) {
    return { notFound: true };
  }

  return {
    props: {
      post
    }
  };
};

const Home = ({ post }: { post: any }) => { // Identify how to type this. Prisma type from model. InferGetSerevrSidePropsType
  return (
    <div>
      {post.title} {' '}
      {post.slug} {' '}
      {post.content} {' '}
    </div>
  );
};

export default Home;