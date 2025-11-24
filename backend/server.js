const express = require('express');
const notesRoutes = require('./routes/notesRoutes');
const rateLimiter = require('./middleware/rateLimiter');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const path = require('path');

const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(rateLimiter);

// Add CORS middleware
app.use(cors({
  origin: "*",
  credentials: true
}));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('MongoDB connection error:', err));

// API routes
app.use('/api', notesRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  // Handle SPA routing - use a different approach
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});