import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Styled Card for better UI
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 350,
  margin: 'auto',
  borderRadius: 15,
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)',
  },
  padding: theme.spacing(2),
}));

const BookCard = ({ book }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [alert, setAlert] = useState(null);
  const [balert, bsetAlert] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Do you really want to delete this book?");
    if (confirmDelete) {
      try {
        await API.delete(`/books/${book._id}`);
        setAlert({ message: 'Book deleted successfully!', severity: 'success' });
        window.location.reload();
      } catch (err) {
        console.error('Delete Error:', err.response?.data || err.message);
        setAlert({ message: 'Failed to delete book', severity: 'error' });
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit-book/${book._id}`, { state: { book } });
  };

  const handleBorrow = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated");
        return;
      }
  
      const response = await fetch(`http://localhost:5000/api/borrow/${bookId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,  // ✅ Ensure token is sent correctly
        },
      });
      
  
      const data = await response.json();
  
      if (response.ok) {
        bsetAlert({ message: 'Book borrowed successfully!', severity: 'success' });
        window.location.reload();  // Refresh to update UI
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("Error:", err);
      bsetAlert({ message: 'Failed to borrow book', severity: 'error' });
    }
  };
  

  return (
    <StyledCard>
      <CardContent>
        {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
        {balert && <Alert severity={balert.severity}>{balert.message}</Alert>}
        <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
          {book.title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          <strong>Author:</strong> {book.author}
        </Typography>
        <Typography variant="body2" color={book.availableCopies > 0 ? 'green' : 'red'} sx={{ fontWeight: 'bold', marginTop: '5px' }}>
          {book.availableCopies > 0 ? `Available: ${book.availableCopies}` : 'Out of Stock'}
        </Typography>

        <div style={{ marginTop: '15px', textAlign: 'center' }}>
          {user?.role === 'admin' ? (
            <>
              <Button variant="contained" color="primary" onClick={handleEdit} size="small" sx={{ marginRight: '10px' }}>
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete} size="small">
                Delete
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClickOpen}
              size="small"
              disabled={book.availableCopies === 0}
            >
              Borrow
            </Button>
          )}
        </div>

        {/* Modal for Borrow Dialog */}
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>Enter Return Date</DialogTitle>
          <DialogContent>
            <TextField type="date" fullWidth InputLabelProps={{ shrink: true }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
            <Button onClick={() => handleBorrow(book._id)} color="primary">
            Confirm Borrow
            </Button>

          </DialogActions>
        </Dialog>
      </CardContent>
    </StyledCard>
  );
};

export default BookCard;
