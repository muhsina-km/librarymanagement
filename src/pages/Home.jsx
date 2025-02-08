import React from 'react';
import AnimatedText from '../components/AnimatedText';
import { Typography, Container } from '@mui/material';

const Home = () => {
  return (
    <Container style={{ textAlign: 'center', marginTop: '20px' }}>
      <AnimatedText />
      <Typography variant="h5" color="textSecondary" style={{ marginTop: '20px', fontStyle: 'italic' }}>
        "A book is a dream you hold in your hands."
      </Typography>
      <Typography variant="h6" style={{ marginTop: '15px' }}>
        📖 Explore endless stories, knowledge, and wisdom at your fingertips.
      </Typography>
      <Typography variant="h6">
        🔖 Find your next favorite book and immerse yourself in the world of literature.
      </Typography>
      <Typography variant="h6">
        🌟 Join our community of passionate readers and let the adventure begin!
      </Typography>
    </Container>
  );
};

export default Home;
