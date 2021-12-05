import { useCallback, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import isHotkey from 'is-hotkey';

import editorFunctions from './CustomEditor';
import { CodeElement, DefaultElement } from './elements';
import { Toolbar as SlateToolbar } from './Toolbar';
import { Leaf } from './Leaf';
import { CustomElement } from '../../types/CustomElement';
import { Paper } from '@mui/material';
import { useAppSelector, useAppDispatch, useNotifier } from '../../src/hooks';
import { enqueueSnackbar } from '../../src/features/notification';



export const PostEditor = ({ slug }: { slug: string }) => {
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

  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.authentication);
  const [value, setValue] = useState<Descendant[]>(initialValue);

  useNotifier();

  // const editor = useMemo(() => withReact(withHistory(createEditor())), []);
  const [editor] = useState(withReact(withHistory(createEditor())));
  return (
    <Paper elevation={2} style={{ padding: 12 }}>
      <Slate value={value} onChange={setValue} editor={editor}>
        <SlateToolbar editor={editor} value={value} slug={slug} />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={async e => {
            if (!e.ctrlKey) return;
            if (isHotkey('mod+s', e)) {
              e.preventDefault();
              if (profile.id === null) {
                return dispatch(enqueueSnackbar({
                  message: 'Failed to save post - you\'re not logged in.',
                  options: {
                    key: 'failedPost',
                    variant: 'error',
                    autoHideDuration: 5000
                  }
                }));
              }
              await editorFunctions.savePost(value, slug);
              dispatch(enqueueSnackbar({
                message: `Post saved under slug "${slug}"!`,
                options: {
                  key: 'postSaved',
                  variant: 'success',
                  autoHideDuration: 5000
                }
              }));
            }
            if (isHotkey('mod+`', e)) {
              e.preventDefault();
              editorFunctions.toggleCodeBlock(editor);
            }
            if (isHotkey('mod+b', e)) {
              e.preventDefault();
              editorFunctions.toggleBold(editor);
            }
            if (isHotkey('mod+i', e)) {
              e.preventDefault();
              editorFunctions.toggleItalics(editor);
            }
            if (isHotkey('mod+k', e)) {
              e.preventDefault();
              editorFunctions.toggleStrikethrough(editor);
            }
            if (isHotkey('mod+u', e)) {
              e.preventDefault();
              editorFunctions.toggleUnderline(editor);
            }
            if (isHotkey('mod+y', e)) {
              e.preventDefault();
              editorFunctions.toggleSuperscript(editor);
            }
            if (isHotkey('mod+h', e)) {
              e.preventDefault();
              editorFunctions.toggleSubscript(editor);
            }
            if (isHotkey('mod+r', e)) {
              e.preventDefault();
              editorFunctions.resetTags(editor);
            }
          }}
        />
      </Slate>
    </Paper>
  );
};