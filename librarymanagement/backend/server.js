require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./connection/database');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Allow frontend to access API
    credentials: true, // Allow cookies and authentication headers
  }));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/borrow', require('./routes/borrowRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));