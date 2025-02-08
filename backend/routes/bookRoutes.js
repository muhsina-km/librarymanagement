const express = require('express');
const { createBook, getBooks, searchBooks, updateBook, deleteBook } = require('../controllers/bookController');
const router = express.Router();

router.post('/', createBook);
router.get('/', getBooks);
router.get('/search', searchBooks);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;