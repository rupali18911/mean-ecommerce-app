const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// 🔥 Middleware FIRST
app.use(cors());
app.use(express.json());

// 🔥 Routes AFTER middleware
app.use('/api/products', productRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send("API Running...");
});

// Start Server
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);