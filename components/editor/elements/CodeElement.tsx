export const CodeElement = ({ attributes, children }: { attributes: any, children: any }) => {
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  );
};