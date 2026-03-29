require('dotenv').config();
<<<<<<< HEAD
const express      = require('express');
const mongoose     = require('mongoose');
const cors         = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes   = require('./routes/authRoutes');
=======
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const path     = require('path');

>>>>>>> 1b585c7 (Ready, Set, Go!)
const resumeRoutes = require('./routes/resumeRoutes');
const aiRoutes     = require('./routes/aiRoutes');

const app = express();

app.use(cors({
<<<<<<< HEAD
  origin:      process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

app.use('/api/auth',    authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai',      aiRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

const PORT      = process.env.PORT      || 5000;
=======
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

// API Routes
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai',      aiRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// MongoDB connection + start server
const PORT     = process.env.PORT     || 5000;
>>>>>>> 1b585c7 (Ready, Set, Go!)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/resume-builder';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
<<<<<<< HEAD
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
=======
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
>>>>>>> 1b585c7 (Ready, Set, Go!)
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
