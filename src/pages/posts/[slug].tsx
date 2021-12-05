import { Container, Divider, Grid, Paper, Typography } from '@mui/material';
import type { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';
import client from '../../lib/prisma';

import { CodeElement, DefaultElement } from '../../components/editor/elements';
import { Leaf } from '../../components/editor/Leaf';
import { Post, User } from '.prisma/client';
import { useAppSelector } from '../../hooks';

interface Params extends ParsedUrlQuery {
  slug: string
}

export const getServerSideProps: GetServerSideProps<any, Params> = async (context) => {
  const { slug } = context.params!;

  const post = await client.post.findFirst({
    where: {
      slug
    }
  });

  if (post === null) {
    return { notFound: true };
  }

  const author = await client.user.findFirst({
    where: {
      id: post.userId
    }
  }) as User;

  return {
    props: {
      post,
      author,
      value: JSON.parse(post.content as string) // Seems stupid.
    }
  };
};

const RenderAuthor = ({ author }: { author: User }) => {
  const select = useAppSelector(state => state.authentication);

  if (author.id === select.id) {
    return <Typography variant='subtitle1'>by {author.username} (that{'\''}s you!)</Typography>;
  } else {
    return <Typography variant='subtitle1'>by {author.username} (uid {author.id})</Typography>;
  }
};

const RenderPost = ({ post, value, author }: { post: Post, value: Descendant[], author: User }) => {

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />;
  }, []);

  // const editor = useMemo(() => withReact(withHistory(createEditor())), []);

  const [editor] = useState(withReact(withHistory(createEditor())));
  return (
    <Container maxWidth='lg'>
      <Paper elevation={8} style={{ padding: 36 }}>
        <Slate editor={editor} value={value} onChange={() => ''}>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item>
              <Typography variant='h3'>{post.title}</Typography>
            </Grid>
            <Grid item>
              <RenderAuthor author={author} />
            </Grid>
          </Grid>
          <Divider sx={{ marginBottom: 2 }} />
          <Editable renderElement={renderElement} renderLeaf={renderLeaf} readOnly />
        </Slate>
      </Paper>
    </Container>
  );
};

export default RenderPost;