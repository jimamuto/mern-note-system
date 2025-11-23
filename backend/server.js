const express = require('express');
const notesRoutes = require('./routes/notesRoutes');
const rateLimiter = require('./middleware/rateLimiter');
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(rateLimiter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected!'));
  
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

//routes to routes 
app.use('/api', notesRoutes);