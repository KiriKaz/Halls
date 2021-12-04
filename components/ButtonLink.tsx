import React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';

const Stuff = ({ ...props }) => (
  <Link href={props.href} as={props.hrefAs} prefetch>
    <a className={props.className}>
      {props.children}
    </a>
  </Link>
);

export const ButtonLink = ({ to, children }: { to: string, children: any }) => <Button component={Stuff} href={to}>{children}</Button>;