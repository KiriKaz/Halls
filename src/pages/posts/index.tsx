import React from "react";
import { GetStaticProps, InferGetStaticPropsType } from 'next';

import client from '../../lib/prisma';
import { Container, Divider, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { ButtonLink } from "../../../components/ButtonLink";

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
    <Container>
      <Paper elevation={2}>
        <Typography padding={4} variant="h4">List of posts</Typography>
        <Divider />
        <List>
          {posts.map((post) => {
            return (
              <ListItem key={post.id}>
                <ListItemButton component={ButtonLink} to={`/posts/${post.slug}`}>
                  <ListItemText primary={post.title} primaryTypographyProps={{ color: 'lightcoral' }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Container>
  );
};

export default Posts;