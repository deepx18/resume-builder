require('dotenv').config();
const express      = require('express');
const mongoose     = require('mongoose');
const cors         = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes   = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const aiRoutes     = require('./routes/aiRoutes');

const app = express();

app.use(cors({
  origin:      process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,   // required for cookies
}));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());   // parse httpOnly refresh-token cookie

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth',    authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai',      aiRoutes);

// Health check (public)
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT      = process.env.PORT      || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/resume-builder';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
