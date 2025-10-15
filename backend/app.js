const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed frontend origins (update if you deploy new one)
const allowedOrigins = [
  'https://automatrix-eta.vercel.app', // main production frontend
  'https://automatrix-fullstack-fiuns1lp8-jaya-kumars-projects-5985ebc3.vercel.app', // your alternate Vercel URL
  'http://localhost:3000', // for local development
];

// ---------- CORS Configuration ----------
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// ---------- Middleware ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- Serve Uploaded Files ----------
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ---------- MongoDB Connection ----------
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
})();

// ---------- Routes ----------
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cars', require('./routes/cars'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/services', require('./routes/services'));

// ---------- Health Check ----------
app.get('/', (req, res) => {
  res.send('🚀 AutoMatrix Backend is running perfectly');
});

// ---------- Global Error Handler ----------
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
