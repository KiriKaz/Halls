import React, { useEffect } from "react";
// import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';

import { Container, Divider, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";

import postService from '../../services/postService';
import { ButtonLink } from "../../components/ButtonLink";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setPosts } from "../../features/post/posts";

const Posts = () => {

  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.posts);

  useEffect(() => {
    postService.getAll().then(posts => { // TODO can be done with GetServerSideProps instead, but translating it back to what it used to be is gonna take some effort
      dispatch(setPosts(posts));
    });
  }, [dispatch]);

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