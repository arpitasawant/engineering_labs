import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {isAuthenticated && (
          <>
            <Button color="inherit" component={Link} to="/events">
              Events
            </Button>
            <Button color="inherit" component={Link} to="/create-event">
              Create Event
            </Button>
            
          <Button color="inherit" component={Link} to="/calendar">
              Calendar
          </Button>

            <Button color="inherit" onClick={() => logout({ returnTo: window.location.origin })}>
              Logout
            </Button>
          </>
        )}
        {!isAuthenticated && (
          <Button color="inherit" onClick={() => loginWithRedirect()}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
