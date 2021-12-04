import { Typography } from '@mui/material';
import type { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useCallback, useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';
import client from '../../lib/prisma';

import { CodeElement, DefaultElement } from '../../components/editor/elements';
import { Leaf } from '../../components/editor/Leaf';

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



  return {
    props: {
      title: post.title,
      value: JSON.parse(post.content as string) // Seems stupid.
    }
  };
};

const Home = ({ title, value }: { title: string, value: Descendant[] }) => {

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

  const editor = useMemo(() => withReact(withHistory(createEditor())), []);
  return (
    <Slate editor={editor} value={value} onChange={() => ''}>
      <Typography variant='h3'>{title}</Typography>
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} readOnly />
    </Slate>
  );
};

export default Home;