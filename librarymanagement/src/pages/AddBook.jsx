import React from 'react';
import BookForm from '../pages/BookForm';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate('/dashboard'); // Redirect to the dashboard after saving
  };

  return (
    <div>
      <BookForm onSave={handleSave} />
    </div>
  );
};

export default AddBook;