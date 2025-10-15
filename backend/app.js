const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- Debug Logger ----------
app.use((req, res, next) => {
  console.log('🌐 Incoming request from origin:', req.headers.origin);
  next();
});

// ---------- CORS Config ----------
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://automatrix-eta.vercel.app',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- Serve Uploaded Files ----------
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ---------- MongoDB Connection ----------
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
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
  res.send("🚀 AutoMatrix Backend is running");
});

// ---------- Global Error Handler ----------
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});