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

  const handleGoBack = () => {
    setSearchQuery(''); 
    fetchBooks(); 
  };

  return (
    <Container>
    
      {/* If the user is an admin, show the "Add New Book" button, else show the search field */}
      {user?.role === 'admin' ? (
        // Admin user: Show only "Add New Book" button
        <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
          Add New Books : 
        
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/add-book"
          style={{ marginLeft: '15px' }}
        >
          Add New Book
        </Button>
        </Typography>
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
        </>
        
      )}

      
     <Typography variant="h4" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Available Books
      </Typography>

      {books.length > 0 ? (
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item key={book._id} xs={12} sm={6} md={4}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    ) : (
      <Typography variant="body1" style={{ textAlign: 'center', marginTop: '30px' }}>
        Book Not Found. 
        <br />
        <Button variant="contained" onClick={handleGoBack} style={{ marginTop: '30px' }}>
        back to home
      </Button>
      </Typography>
    )}

    </Container>
  );
};

export default Dashboard;
