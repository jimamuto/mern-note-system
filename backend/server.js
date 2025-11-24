// server.js
const express = require('express');
const notesRoutes = require('./routes/notesRoutes');
const rateLimiter = require('./middleware/rateLimiter');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

dotenv.config();

const app = express();


// MIDDLEWARE


// Parse JSON
app.use(express.json());

// Rate limiter
app.use(rateLimiter);

// CORS 
app.use(cors({
  origin: "*",
  credentials: true,
}));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('MongoDB connection error:', err));


// API ROUTES

app.use('/api', notesRoutes);


if (process.env.NODE_ENV === "production") {
  // Path to the built React frontend
  const distPath = path.join(__dirname, "../frontend/dist");

  // Serve static files
  app.use(express.static(distPath));

  // SPA fallback 
  app.use((req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
