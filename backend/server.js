const express = require('express');
const notesRoutes = require('./routes/notesRoutes');
const rateLimiter = require('./middleware/rateLimiter');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(rateLimiter);

// Add CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite frontend URL
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected!'));
  
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

//routes to routes 
app.use('/api', notesRoutes);