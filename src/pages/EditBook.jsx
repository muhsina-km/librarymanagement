import React from 'react';
import { useLocation } from 'react-router-dom';
import BookForm from '../pages/BookForm';

const EditBook = () => {
  const location = useLocation();
  const { book } = location.state || {}; // Get the book data passed from the BookCard component

  return (
    <div>
      {book ? (
        <BookForm book={book} onSave={() => console.log('Book updated!')} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditBook;
