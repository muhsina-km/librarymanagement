const express = require('express');
const { borrowBook, returnBook, getBorrowHistory } = require('../controllers/borrowController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:bookId', authMiddleware, borrowBook);
router.post('/return/:bookId', authMiddleware, returnBook);
router.get('/history', authMiddleware, getBorrowHistory);

module.exports = router;