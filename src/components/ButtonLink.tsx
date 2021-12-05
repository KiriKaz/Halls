import React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';

const Stuff = ({ ...props }) => (
  <Link href={props.href} as={props.hrefAs}>
    <a className={props.className}>
      {props.children}
    </a>
  </Link>
);

export const ButtonLink = ({ to, children, ...props }: { to: string, children: any }) => <Button {...props} component={Stuff} href={to}>{children}</Button>;