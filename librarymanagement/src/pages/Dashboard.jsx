import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import BookCard from '../components/BookCard';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();  // Access logged-in user from AuthContext

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await API.get('/books');
      setBooks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await API.get(`/books/search?q=${searchQuery}`);
      setBooks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Dashboard
      </Typography>

      {/* If the user is an admin, show the "Add New Book" button, else show the search field */}
      {user?.role === 'admin' ? (
        // Admin user: Show only "Add New Book" button
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/add-book"
          style={{ marginBottom: '20px' }}
        >
          Add New Book
        </Button>
      ) : (
        // Regular user: Show search field
        <>
          <TextField
            label="Search Books"
            fullWidth
            margin="normal"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="contained" onClick={handleSearch} style={{ marginBottom: '20px' }}>
            Search
          </Button>
             <br />
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <h4 style={{ marginRight: '10px' }}>Here is your borrow history:</h4>
        <Button
            variant="contained"
            color="success"
            component={Link}
            to="/borrow-history"
            style={{marginTop: '-20px'}}
        >
            Borrow Details
        </Button>
        </div>
        </>
      )}
         
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
        Available Books :
      </Typography>

      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item key={book._id} xs={12} sm={6} md={4}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
