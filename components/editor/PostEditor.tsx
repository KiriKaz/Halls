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

  const [value, setValue] = useState<Descendant[]>(initialValue);

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
              await editorFunctions.savePost(value, slug);
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