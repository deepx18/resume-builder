const User         = require('../models/User');
const tokenService = require('../services/tokenService');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ── helpers ───────────────────────────────────────────────────────────────────

function issueTokens(res, user) {
  const accessToken  = tokenService.signAccess(user);
  const refreshToken = tokenService.signRefresh(user);

  // Store refresh token hash in DB (simple version: store raw token)
  user.refreshTokens.push({ token: refreshToken });
  // Keep at most 5 concurrent sessions
  if (user.refreshTokens.length > 5) {
    user.refreshTokens = user.refreshTokens.slice(-5);
  }

  res.cookie('refreshToken', refreshToken, tokenService.refreshCookieOptions());
  return accessToken;
}

// ── controllers ───────────────────────────────────────────────────────────────

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: 'name, email and password are required.' });

    if (await User.findOne({ email }))
      return res.status(409).json({ error: 'Email already registered.' });

    const user = new User({ name, email, password });
    const accessToken = issueTokens(res, user);
    await user.save();

    res.status(201).json({ accessToken, user: user.toSafeObject() });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ error: 'Invalid email or password.' });

    const accessToken = issueTokens(res, user);
    await user.save();

    res.json({ accessToken, user: user.toSafeObject() });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// POST /api/auth/google
exports.googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) return res.status(400).json({ error: 'credential is required.' });
    if (!process.env.GOOGLE_CLIENT_ID)
      return res.status(503).json({ error: 'Google OAuth not configured.' });

    const ticket  = await googleClient.verifyIdToken({
      idToken:  credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture: avatar } = payload;

    let user = await User.findOne({ $or: [{ googleId }, { email }] });
    if (!user) {
      user = new User({ name, email, googleId, avatar, isVerified: true });
    } else {
      user.googleId = user.googleId || googleId;
      user.avatar   = avatar || user.avatar;
    }

    const accessToken = issueTokens(res, user);
    await user.save();

    res.json({ accessToken, user: user.toSafeObject() });
  } catch (e) {
    console.error('Google auth error:', e.message);
    res.status(401).json({ error: 'Google authentication failed.' });
  }
};

// POST /api/auth/refresh
exports.refresh = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ error: 'No refresh token.' });

    let payload;
    try {
      payload = tokenService.verifyRefresh(token);
    } catch {
      return res.status(401).json({ error: 'Invalid or expired refresh token.' });
    }

    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ error: 'User not found.' });

    const stored = user.refreshTokens.find(t => t.token === token);
    if (!stored)  return res.status(401).json({ error: 'Refresh token revoked.' });

    // Rotate: remove old, issue new
    user.refreshTokens = user.refreshTokens.filter(t => t.token !== token);
    const accessToken  = issueTokens(res, user);
    await user.save();

    res.json({ accessToken });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// POST /api/auth/logout
exports.logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      const payload = tokenService.verifyRefresh(token).catch(() => null);
      if (payload) {
        const user = await User.findById(payload.sub);
        if (user) {
          user.refreshTokens = user.refreshTokens.filter(t => t.token !== token);
          await user.save();
        }
      }
    }
  } catch {}

  res.clearCookie('refreshToken', { path: '/api/auth' });
  res.json({ message: 'Logged out.' });
};

// GET /api/auth/me
exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.sub);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json(user.toSafeObject());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
