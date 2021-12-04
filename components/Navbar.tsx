import { AppBar, Button, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import React, { useState } from 'react';

import { ButtonLink } from './ButtonLink';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PostaddIcon from '@mui/icons-material/Postadd';
import CreateIcon from '@mui/icons-material/Create';

const Navbar = () => {
  const [open, setOpen] = useState(false);

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
            <Grid item>
              <Button color="inherit">Login</Button>
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
              <ListItemText primary="Inbox" />
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