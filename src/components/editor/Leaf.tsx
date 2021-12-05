interface ILeafProps {
  attributes: any
  children: any
  leaf: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    superscript: boolean
    subscript: boolean
  }
}

export const Leaf = ({ attributes, children, leaf: { bold, italic, strikethrough, underline, superscript, subscript } }: ILeafProps) => {
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