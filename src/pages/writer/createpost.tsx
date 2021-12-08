import { Container, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import router from "next/router";
import { useEffect } from "react";
import { PostEditor } from "../../components/editor";
import { initializeNewPost, sanitizeAndSetSlug, setTitle } from "../../features/post/currentWriting";
import { useAppDispatch, useAppSelector } from "../../hooks";


const RenderSlugs = () => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(state => state.writing);

  return (
    <Typography variant='body1'>
      You are currently saving to <TextField color='secondary' variant='standard' value={post.slug} onChange={(e) => dispatch(sanitizeAndSetSlug(e.target.value))} />.
      {post.editingSlug ? (
        <Typography variant='body2'>
          You are, however, editing the post currently at slug {post.editingSlug}.
        </Typography>
      ) : null}
    </Typography>
  );
};

const RenderTitle = () => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(state => state.writing);

  return (
    <Typography variant='body1'>
      Title: <TextField fullWidth color='secondary' variant='standard' value={post.title} onChange={(e) => dispatch(setTitle(e.target.value))} />.
    </Typography>
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
      <Paper elevation={2} style={{ padding: 12 }}>
        <Grid container spacing={2} direction='row' justifyContent='space-between' >
          <Grid item xs={6}>
            <RenderSlugs />
          </Grid>
          <Grid item xs={6}>
            <RenderTitle />
          </Grid>
        </Grid>
        <Divider />
        <PostEditor />
      </Paper>
    </Container>
  );
};

export default CreatePost;