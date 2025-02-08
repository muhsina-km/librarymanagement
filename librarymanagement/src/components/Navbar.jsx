import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Tooltip, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Import the Profile Icon

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Library Management System
          </Typography>
          {isAuthenticated && (
            <>
        <div>
        <Button color="inherit" component={Link} to="/dashboard">
        home
              </Button>
        <Button color="inherit" component={Link} to="/borrow-history">
                Borrow History
              </Button>
        </div>
              {/* Profile Icon */}
              <Tooltip title="Profile">
                <IconButton color="inherit" component={Link} to="/profile">
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <br />
      <br />
    </div>
  );
};

export default Navbar;
