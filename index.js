require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// ✅ middleware
app.use(cors());
app.use(express.json());

// ✅ test route
app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

// ✅ routes
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);

// ✅ connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch(err => console.error('DB error:', err));

// ✅ port from .env
const PORT = process.env.PORT || 3000;

// ✅ start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});