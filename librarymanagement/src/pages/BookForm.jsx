import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const BookForm = ({ book, onSave }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [availableCopies, setAvailableCopies] = useState(1);
  const navigate = useNavigate();

  // If book prop is provided (i.e., editing an existing book), populate the form fields
  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setIsbn(book.isbn);
      setPublishedYear(book.publishedYear);
      setAvailableCopies(book.availableCopies);
    }
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = { title, author, isbn, publishedYear, availableCopies };

    try {
      if (book) {
        // Update existing book
        await API.put(`/books/${book._id}`, bookData);
      } else {
        // Create new book
        await API.post('/books', bookData);
      }
      onSave(); // Callback to refresh the book list
      navigate('/dashboard'); // Redirect to the dashboard
    } catch (err) {
      alert('Failed to save book');
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {book ? 'Edit Book' : 'Add New Book'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Author"
          fullWidth
          margin="normal"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <TextField
          label="ISBN"
          fullWidth
          margin="normal"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />
        <TextField
          label="Published Year"
          type="number"
          fullWidth
          margin="normal"
          value={publishedYear}
          onChange={(e) => setPublishedYear(e.target.value)}
        />
        <TextField
          label="Available Copies"
          type="number"
          fullWidth
          margin="normal"
          value={availableCopies}
          onChange={(e) => setAvailableCopies(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {book ? 'Update Book' : 'Add Book'}
        </Button>
      </form>
    </Container>
  );
};

export default BookForm;
