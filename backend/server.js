const express = require('express');
const notesRoutes = require('./routes/notesRoutes');
const rateLimiter = require('./middleware/rateLimiter');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(rateLimiter);

// CORS (allow everything – safe for Render)
app.use(cors({
  origin: "*",
  credentials: true,
}));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api', notesRoutes);
// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "frontend/dist");

  // Serve static files
  app.use(express.static(distPath));

  // SPA fallback 
  app.use((req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
