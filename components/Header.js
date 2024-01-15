import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
          Text to Modify
        </Typography>
        <IconButton color="inherit" href="https://github.com/cl3arview" target="_blank">
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
