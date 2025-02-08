const Borrow = require('../models/borrow');
const Book = require('../models/book');

// Borrow a book
const borrowBook = async (req, res) => {
    const { bookId } = req.params;
    const { returnDate } = req.body;
  
    try {
      console.log("User ID:", req.user.id);
      console.log("Book ID:", bookId);
  
      const book = await Book.findById(bookId);
      if (!book) {
        console.log("Book not found");
        return res.status(404).json({ error: "Book not found" });
      }
  
      if (book.availableCopies < 1) {
        console.log("No available copies");
        return res.status(400).json({ error: "Book not available" });
      }
  
      console.log("Before borrow, availableCopies:", book.availableCopies);
  
      book.availableCopies -= 1;
      await book.save();
  
      console.log("After borrow, availableCopies:", book.availableCopies);
  
      const borrowRecord = new Borrow({
        user: req.user.id,
        book: bookId,
        borrowDate: new Date(),
        returnDate: returnDate ? new Date(returnDate) : new Date(new Date().setDate(new Date().getDate() + 14))
      });
  
      await borrowRecord.save();
      console.log("Borrow record saved:", borrowRecord);
  
      res.json({ message: "Book borrowed successfully" });
    } catch (err) {
      console.error("Error borrowing book:", err);
      res.status(500).json({ error: err.message });
    }
  };
  

// Return a book
const returnBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const borrowRecord = await Borrow.findOne({ book: bookId, user: req.user.id, returnDate: null });
    if (!borrowRecord) {
      return res.status(400).json({ error: 'No active borrowing record found' });
    }

    borrowRecord.returnDate = Date.now();
    await borrowRecord.save();

    const book = await Book.findById(bookId);
    book.availableCopies += 1;
    await book.save();

    res.json({ message: 'Book returned successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View borrowing history
const getBorrowHistory = async (req, res) => {
  console.log("Fetching borrow history for user:", req.user.id);
  try {
      const history = await Borrow.find({ user: req.user.id }).populate("book");
      console.log("Borrow history found:", history);
      res.json(history);
  } catch (err) {
      console.error("Error fetching borrow history:", err);
      res.status(500).json({ error: err.message });
  }
};

module.exports = { borrowBook, returnBook, getBorrowHistory };
