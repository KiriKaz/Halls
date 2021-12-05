import { Typography } from "@mui/material";

export const DefaultElement = ({ attributes, children }: { attributes: any, children: any }) => {
  return <Typography variant='body1' {...attributes}>{children}</Typography>;
};