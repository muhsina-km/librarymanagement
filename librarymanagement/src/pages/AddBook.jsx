import React, { useState } from 'react';
import BookForm from '../pages/BookForm';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

const AddBook = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <BookForm onSave={handleSave} />
    </div>
  );
};

export default AddBook;