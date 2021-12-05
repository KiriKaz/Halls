import { Container, Paper, TextField, Typography } from "@mui/material";
import router from "next/router";
import { useEffect, useState } from "react";
import { PostEditor } from "../../components/editor";
import { initializeNewPost, sanitizeAndSetSlug } from "../../features/post/currentWriting";
import { useAppDispatch, useAppSelector } from "../../hooks";


const RenderSlug = () => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(state => state.writing);

  return (
    <TextField color='secondary' variant='standard' value={post.slug} onChange={(e) => dispatch(sanitizeAndSetSlug(e.target.value))} />
  );
};

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.authentication);

  useEffect(() => {
    if (!profile.token || !profile.username) {
      router.push('/login');
    }
    dispatch(initializeNewPost());
  }, [dispatch, profile]);

  return (
    <Container maxWidth='md'>
      <Paper elevation={30} style={{ padding: 12, marginBottom: 12 }}>
        <Typography variant='body1'>
          You are currently editing slug <RenderSlug />.
        </Typography>
      </Paper>
      <PostEditor />
    </Container>
  );
};

export default CreatePost;