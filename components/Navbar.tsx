import { AppBar, Button, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { ButtonLink } from './ButtonLink';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PostaddIcon from '@mui/icons-material/Postadd';
import CreateIcon from '@mui/icons-material/Create';
import { useAppDispatch, useAppSelector } from '../src/hooks';
import { initializeUser, logout } from '../src/features/authentication/login';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const profile = useAppSelector(state => state.authentication);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  return (
    <>
      <AppBar>
        <Toolbar>
          <Grid container flexDirection="row" justifyContent="space-between">
            <Grid item>
              <IconButton
                onClick={() => {
                  setOpen(true);
                }}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item container flex={1} justifyContent="flex-end" alignContent="center">
              {
                !profile.token ? (
                  <Grid item>
                    <Link href='/login' passHref>
                      <Button color="inherit" component="a">
                        Login
                      </Button>
                    </Link>
                  </Grid>
                ) : (
                  <>
                    <Grid item>
                      <Typography variant='subtitle1' padding={0.5}>Logged in as {profile.username}</Typography>
                    </Grid>
                    <Grid item>
                      <Button color="inherit" onClick={() => dispatch(logout())}>Logout</Button>
                    </Grid>
                  </>
                )
              }
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List>
          <ListItem>
            <ListItemButton component={ButtonLink} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={ButtonLink} to="/posts">
              <ListItemIcon>
                <PostaddIcon />
              </ListItemIcon>
              <ListItemText primary="Posts" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={ButtonLink} to="/writer/createpost">
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary="Create post" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;