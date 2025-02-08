import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Box, Button } from '@mui/material';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const BorrowHistory = () => {
  const [borrowHistory, setBorrowHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBorrowHistory();
  }, []);

  const fetchBorrowHistory = async () => {
    try {
        const response = await API.get('/borrow/history');
        console.log("Fetched Borrow History:", response.data);
        setBorrowHistory(response.data);  // No filtering here
    } catch (err) {
        console.error(err);
    }
};

  const handleBackClick = () => {
    navigate('/dashboard'); 
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Borrowing History
      </Typography>
      {borrowHistory.length > 0 ? (
        borrowHistory.map((record) => (
          <Card key={record._id} variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{record.book.title}</Typography>
              <Typography variant="body1">
                <strong>Borrowed on:</strong> {new Date(record.borrowDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                <strong>Return Date:</strong> {record.returnDate ? new Date(record.returnDate).toLocaleDateString() : 'Not returned yet'}
              </Typography>
              
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1">No borrowing history found.</Typography>
      )}
      <br />
      <Button variant="contained" color="primary" onClick={handleBackClick}>
        Back
      </Button>
    </Container>
  );
};

export default BorrowHistory;
