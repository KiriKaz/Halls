import { useCallback, useEffect, useState } from 'react';
import { createEditor, BaseEditor, Descendant, Transforms, Editor, Text, Element } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory, HistoryEditor } from 'slate-history';
import router from 'next/router';
import { Button, ButtonGroup, Container, Grid } from '@mui/material';

import { CustomElement } from '../../types/CustomElement';
import { CustomText } from '../../types/CustomText';

import axios from 'axios';

// PERFORMANCE: Because we're using Babel (right now, anyway)
// we want to cut down on modules imported so compile time for fast refreshes 
// is snappy. This only imports the icons we need.
// Named imports import the entire module.
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import FormatStrikethrough from '@mui/icons-material/FormatStrikethrough';
import FormatUnderlined from '@mui/icons-material/FormatUnderlined';
import FormatQuote from '@mui/icons-material/FormatQuote';
import SuperscriptIcon from '@mui/icons-material/Superscript';
import SubscriptIcon from '@mui/icons-material/Subscript';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import SaveIcon from '@mui/icons-material/Save';

type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}

const CustomEditor = {

  isBold: (editor: Editor) => {
    const [match] = Editor.nodes(editor, {
      match: n => Text.isText(n) && n.bold === true,
      universal: true
    });

    return !!match;
  },

  isItalics: (editor: Editor) => {
    const [match] = Editor.nodes(editor, {
      match: n => Text.isText(n) && n.italic === true,
      universal: true
    });

    return !!match;
  },

  isStrikethrough: (editor: Editor) => {
    const [match] = Editor.nodes(editor, {
      match: n => Text.isText(n) && n.strikethrough === true,
      universal: true
    });

    return !!match;
  },

  isUnderline: (editor: Editor) => {
    const [match] = Editor.nodes(editor, {
      match: n => Text.isText(n) && n.underline === true,
      universal: true
    });

    return !!match;
  },

  isSuperscript: (editor: Editor) => {
    const [match] = Editor.nodes(editor, {
      match: n => Text.isText(n) && n.superscript === true,
      universal: true
    });

    return !!match;
  },

  isSubscript: (editor: Editor) => {
    const [match] = Editor.nodes(editor, {
      match: n => Text.isText(n) && n.subscript === true,
      universal: true
    });

    return !!match;
  },

  isSpoiler: (editor: Editor) => {
    const [match] = Editor.nodes(editor, {
      match: n => Text.isText(n) && n.discordSpoiler === true,
      universal: true
    });

    return !!match;
  },

  isSmallcaps: (editor: Editor) => {
    const [match] = Editor.nodes(editor, {
      match: n => Text.isText(n) && n.smallcaps === true,
      universal: true
    });

    return !!match;
  },

  isFullWidth: (editor: Editor) => {
    const [match] = Editor.nodes(editor, {
      match: n => Text.isText(n) && n.fullWidth === true,
      universal: true
    });

    return !!match;
  },

  isUpsideDown: (editor: Editor) => {
    const [match] = Editor.nodes(editor, {
      match: n => Text.isText(n) && n.upsideDown === true,
      universal: true
    });

    return !!match;
  },

  hasCustomFont: (editor: Editor) => {
    const [match] = Editor.nodes(editor, {
      match: n => Text.isText(n) && n.customFont !== undefined,
      universal: true
    });

    return !!match;
  },
  // TODO implement custom font handling

  isCodeBlockActive: (editor: Editor) => {
    const [match] = Editor.nodes(editor, {
      match: n => Element.isElement(n) && n.type === 'code'
    });

    return !!match;
  },


  toggleBold: (editor: Editor) => {
    const isActive = CustomEditor.isBold(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? undefined : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleItalics: (editor: Editor) => {
    const isActive = CustomEditor.isItalics(editor);
    Transforms.setNodes(
      editor,
      { italic: isActive ? undefined : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleStrikethrough: (editor: Editor) => {
    const isActive = CustomEditor.isStrikethrough(editor);
    Transforms.setNodes(
      editor,
      { strikethrough: isActive ? undefined : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleUnderline: (editor: Editor) => {
    const isActive = CustomEditor.isUnderline(editor);
    Transforms.setNodes(
      editor,
      { underline: isActive ? undefined : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleSuperscript: (editor: Editor) => {
    const isActive = CustomEditor.isSuperscript(editor);
    Transforms.setNodes(
      editor,
      { superscript: isActive ? undefined : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleSubscript: (editor: Editor) => {
    const isActive = CustomEditor.isSubscript(editor);
    Transforms.setNodes(
      editor,
      { subscript: isActive ? undefined : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleSpoiler: (editor: Editor) => {
    const isActive = CustomEditor.isSpoiler(editor);
    Transforms.setNodes(
      editor,
      { discordSpoiler: isActive ? undefined : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleSmallcaps: (editor: Editor) => {
    const isActive = CustomEditor.isSmallcaps(editor);
    Transforms.setNodes(
      editor,
      { smallcaps: isActive ? undefined : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleFullWidth: (editor: Editor) => {
    const isActive = CustomEditor.isFullWidth(editor);
    Transforms.setNodes(
      editor,
      { fullWidth: isActive ? undefined : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleUpsideDown: (editor: Editor) => {
    const isActive = CustomEditor.isUpsideDown(editor);
    Transforms.setNodes(
      editor,
      { upsideDown: isActive ? undefined : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  // TODO handleCustomFontshitPleaseJesus: (editor: Editor) => {
  // TODO
  // TODO },

  resetTags: (editor: Editor) => {
    Transforms.setNodes(
      editor,
      {
        bold: undefined,
        italic: undefined,
        strikethrough: undefined,
        underline: undefined,
        superscript: undefined,
        subscript: undefined,
        discordSpoiler: undefined,
        smallcaps: undefined,
        fullWidth: undefined,
        upsideDown: undefined
      },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleCodeBlock: (editor: Editor) => {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : 'code' },
      { match: n => Editor.isBlock(editor, n) }
    );
  }
};

export const CodeElement = ({ attributes, children }: { attributes: any, children: any }) => {
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  );
};

export const DefaultElement = ({ attributes, children }: { attributes: any, children: any }) => {
  return <p {...attributes}>{children}</p>;
};

export const Leaf = ({ attributes, children, leaf: { bold, italic, strikethrough, underline, superscript, subscript } }: { attributes: any, children: any, leaf: { bold: boolean, italic: boolean, strikethrough: boolean, underline: boolean, superscript: boolean, subscript: boolean } }) => {
  let textDecoration: string | null = ``;
  if (underline) textDecoration = `underline ${textDecoration}`;
  if (strikethrough) textDecoration = `line-through ${textDecoration}`;

  if (textDecoration === ``) textDecoration = null;

  const style = {
    fontWeight: bold ? 'bold' : 'normal',
    fontStyle: italic ? 'italic' : 'initial',
    textDecoration
  };

  if (superscript) {
    if (!subscript) {
      return (
        <span
          {...attributes}
          style={style}
        >
          <sup>{children}</sup>
        </span>
      );
    }
  } else {
    if (subscript) {
      return (
        <span
          {...attributes}
          style={style}
        >
          <sub>{children}</sub>
        </span>
      );
    }
  }

  return (
    <span
      {...attributes}
      style={style}
    >
      {children}
    </span>
  );
};


const SlateToolbar = ({ editor, value, slug }: { editor: Editor, value: Descendant[], slug: string }) => (
  <Grid container spacing={2}>
    <Grid item>
      <ButtonGroup variant='contained' color='secondary'>
        {/* Natural language formatting group */}
        <Button
          onClick={e => {
            e.preventDefault();
            CustomEditor.toggleBold(editor);
          }}
          size='small'
        >
          <FormatBold />
        </Button>
        <Button
          onClick={e => {
            e.preventDefault();
            CustomEditor.toggleItalics(editor);
          }}
          size='small'
        >
          <FormatItalic />
        </Button>
        <Button
          onClick={e => {
            e.preventDefault();
            CustomEditor.toggleStrikethrough(editor);
          }}
          size='small'
        >
          <FormatStrikethrough />
        </Button>
        <Button
          onClick={e => {
            e.preventDefault();
            CustomEditor.toggleUnderline(editor);
          }}
          size='small'
        >
          <FormatUnderlined />
        </Button>
        <Button
          onClick={e => {
            e.preventDefault();
            CustomEditor.toggleSuperscript(editor);
          }}
          size='small'
        >
          <SuperscriptIcon />
        </Button>
        <Button
          onClick={e => {
            e.preventDefault();
            CustomEditor.toggleSubscript(editor);
          }}
          size='small'
        >
          <SubscriptIcon />
        </Button>
        <Button
          onClick={e => {
            e.preventDefault();
            CustomEditor.resetTags(editor);
          }}
          size='small'
        >
          <FormatClearIcon />
        </Button>
      </ButtonGroup>
    </Grid>
    <Grid item>
      <ButtonGroup variant='contained' color='secondary'>
        {/* Edit element group */}
        <Button
          onClick={e => {
            e.preventDefault();
            CustomEditor.toggleCodeBlock(editor);
          }}
          size='small'
        >
          <FormatQuote />
        </Button>
      </ButtonGroup>



    </Grid>
    <Button
      onClick={async (e) => {
        e.preventDefault();
        const content = JSON.stringify(value);
        await axios.post('/api/posts/create', { content, slug });
      }}
    >
      <SaveIcon />
    </Button>
  </Grid>
);

const CreatePost = () => {

  useEffect(() => {
    if (!localStorage.getItem('sessionToken')) {
      router.push('/login');
    }
  }, []);

  const initialValue: CustomElement[] = [
    {
      type: 'paragraph',
      children: [{ text: 'Line of text.' }]
    }
  ];

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

  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [slug, setSlug] = useState<string>((Math.random() * 10000).toString());

  // const editor = useMemo(() => withReact(withHistory(createEditor())), []);
  const [editor] = useState(withReact(withHistory(createEditor())));
  return (
    <Container maxWidth='md'>
      <Slate value={value} onChange={setValue} editor={editor}>
        <SlateToolbar editor={editor} value={value} slug={slug} />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={event => {
            if (!event.ctrlKey) return;
            switch (event.key) {  // Swap to is-hotkey
              case '`': {
                event.preventDefault();
                CustomEditor.toggleCodeBlock(editor);
                break;
              }
              case 'b':
                event.preventDefault();
                CustomEditor.toggleBold(editor);
                break;
              case 'i':
                event.preventDefault();
                CustomEditor.toggleItalics(editor);
                break;
              case 'k':
                event.preventDefault();
                CustomEditor.toggleStrikethrough(editor);
                break;
              case 'u':
                event.preventDefault();
                CustomEditor.toggleUnderline(editor);
                break;
              case 'y':
                event.preventDefault();
                CustomEditor.toggleSuperscript(editor);
                break;
              case 'h':
                event.preventDefault();
                CustomEditor.toggleSubscript(editor);
                break;
              case 'r':
                event.preventDefault();
                CustomEditor.resetTags(editor);
                break;
            }
          }}
        />
      </Slate>
    </Container>
  );
};

export default CreatePost;