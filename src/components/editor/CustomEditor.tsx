import { Descendant, Editor, Element, Text, Transforms } from "slate";
import PostService from '../../services/postService';

const customEditor = {

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
    const isActive = customEditor.isBold(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? undefined : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleItalics: (editor: Editor) => {
    const isActive = customEditor.isItalics(editor);
    Transforms.setNodes(
      editor,
      { italic: isActive ? undefined : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleStrikethrough: (editor: Editor) => {
    const isActive = customEditor.isStrikethrough(editor);
    Transforms.setNodes(
      editor,
      { strikethrough: isActive ? undefined : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleUnderline: (editor: Editor) => {
    const isActive = customEditor.isUnderline(editor);
    Transforms.setNodes(
      editor,
      { underline: isActive ? undefined : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleSuperscript: (editor: Editor) => {
    const isActive = customEditor.isSuperscript(editor);
    Transforms.setNodes(
      editor,
      { superscript: isActive ? undefined : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleSubscript: (editor: Editor) => {
    const isActive = customEditor.isSubscript(editor);
    Transforms.setNodes(
      editor,
      { subscript: isActive ? undefined : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleSpoiler: (editor: Editor) => {
    const isActive = customEditor.isSpoiler(editor);
    Transforms.setNodes(
      editor,
      { discordSpoiler: isActive ? undefined : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleSmallcaps: (editor: Editor) => {
    const isActive = customEditor.isSmallcaps(editor);
    Transforms.setNodes(
      editor,
      { smallcaps: isActive ? undefined : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleFullWidth: (editor: Editor) => {
    const isActive = customEditor.isFullWidth(editor);
    Transforms.setNodes(
      editor,
      { fullWidth: isActive ? undefined : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleUpsideDown: (editor: Editor) => {
    const isActive = customEditor.isUpsideDown(editor);
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
    const isActive = customEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : 'code' },
      { match: n => Editor.isBlock(editor, n) }
    );
  },

  savePost: async (value: string | Descendant[], slug: string, title: string) => {
    const content = JSON.stringify(value);

    const r = await PostService.upsert({ content, slug, title });

    if (r.message) { // TODO fix this mess
      return { error: true, data: r.message };
    }

    return { error: false, data: r };
  },

  // updatePost: async (value: string | Descendant[], slug: string) => {
  //   const content = JSON.stringify(value);

  //   const prisma = (await import('../../lib/prisma')).default;

  //   prisma.post.update({
  //     where: { }
  //   })

  //   // const r = await PostService.update(slug, { content });

  //   return { data: r };
  // }
};

export default customEditor;