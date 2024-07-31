import React from 'react';

// external library
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Zen Practical
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar