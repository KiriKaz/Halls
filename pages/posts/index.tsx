import React from "react";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Link from "next/link";
import superjson from "superjson";

import client from '../../lib/prisma';

interface Post {
  rawContent?: any,
  id: any,
  slug: string,
  title: string
}  // Define this type elsewhere -- probably in the entity or smth. Depends on backend, especially if using ORM.

interface IPostsProps {
  posts: Post[]
}

export const getStaticProps: GetStaticProps<IPostsProps> = async () => {

  let posts = await client.post.findMany({});

  return {
    props: {
      posts
    }
  };
};

const Posts = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <h1>List of posts</h1>
      <ul>
        {posts.map((post, idx) => {
          return (
            <li key={post.id}>
              <Link href={`/posts/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Posts;