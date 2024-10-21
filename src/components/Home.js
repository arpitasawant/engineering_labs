import React from 'react';
import { Typography, Container } from '@mui/material';

const Home = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to Your Personal Calendar
      </Typography>
      <Typography variant="body1">
        Log in to create, view, edit, and delete your calendar events.
      </Typography>
    </Container>
  );
};

export default Home;
