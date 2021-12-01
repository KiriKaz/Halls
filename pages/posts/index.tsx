import React from "react";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Link from "next/link";

import fs from 'fs';
import { v4 as uuid } from 'uuid';


interface Post {
  rawContent: any,
  id: any,
  slug: string,
  title: string
}  // Define this type elsewhere -- probably in the entity or smth. Depends on backend, especially if using ORM.

interface IPostsProps {
  posts: Post[]
}

export const getStaticProps: GetStaticProps<IPostsProps> = async () => {
  // Yoinked from a bunch of places. TODO

  const files = fs.readdirSync(`${process.cwd()}/contents`, "utf-8");  // Change later! also, process.cwd? I don't like it.

  const posts: Post[] = files
    .filter((filename: string) => filename.endsWith(".md"))  // Potentially use different format. (no we're not.)
    .map((filename: string) => {
      const path = `${process.cwd()}/contents/${filename}`;
      const rawContent = fs.readFileSync(path, {
        encoding: "utf-8",
      });

      return { rawContent, id: uuid(), slug: 'TODO', title: 'TODO' };
    });

  return {
    props: { posts },
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