const User         = require('../models/User');
const tokenService = require('../services/tokenService');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/* ─── helpers ─────────────────────────────────────────────────────────────── */

function sendTokens(res, user) {
  const accessToken  = tokenService.signAccess(user);
  const refreshToken = tokenService.signRefresh(user);

  // Rotate: add new refresh token to user's list (keep last 5 devices)
  user.refreshTokens.push({ token: refreshToken });
  if (user.refreshTokens.length > 5) user.refreshTokens.shift();
  user.save();   // fire-and-forget

  res.cookie('refreshToken', refreshToken, tokenService.refreshCookieOptions());

  return res.json({
    accessToken,
    user: user.toSafeObject(),
  });
}

/* ─── POST /api/auth/register ──────────────────────────────────────────────── */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: 'name, email and password are required.' });

    if (password.length < 8)
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ error: 'An account with this email already exists.' });

    const user = await User.create({ name, email, password, isVerified: true });
    return sendTokens(res, user);
  } catch (e) {
    console.error('[Auth] register error:', e.message);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
};

/* ─── POST /api/auth/login ─────────────────────────────────────────────────── */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required.' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ error: 'Invalid email or password.' });

    const valid = await user.comparePassword(password);
    if (!valid) return res.status(401).json({ error: 'Invalid email or password.' });

    return sendTokens(res, user);
  } catch (e) {
    console.error('[Auth] login error:', e.message);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
};

/* ─── POST /api/auth/google ────────────────────────────────────────────────── */
exports.googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;   // ID token from Google One-Tap / Sign-in button
    if (!credential) return res.status(400).json({ error: 'Google credential is required.' });

    if (!process.env.GOOGLE_CLIENT_ID)
      return res.status(503).json({ error: 'Google OAuth is not configured on this server.' });

    const ticket = await googleClient.verifyIdToken({
      idToken:  credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { sub: googleId, email, name, picture } = ticket.getPayload();

    // Find by googleId first, then fall back to email (link existing account)
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
      if (!user.googleId) { user.googleId = googleId; user.avatar = picture; }
    } else {
      user = await User.create({ name, email, googleId, avatar: picture, isVerified: true });
    }

    return sendTokens(res, user);
  } catch (e) {
    console.error('[Auth] Google auth error:', e.message);
    res.status(401).json({ error: 'Google sign-in failed. Please try again.' });
  }
};

/* ─── POST /api/auth/refresh ───────────────────────────────────────────────── */
exports.refresh = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ error: 'No refresh token.' });

    let payload;
    try {
      payload = tokenService.verifyRefresh(token);
    } catch {
      return res.status(401).json({ error: 'Refresh token expired or invalid.' });
    }

    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ error: 'User not found.' });

    // Token rotation: verify this refresh token is in the user's list
    const stored = user.refreshTokens.find(rt => rt.token === token);
    if (!stored) return res.status(401).json({ error: 'Refresh token revoked.' });

    // Remove old token — a new one will be issued
    user.refreshTokens = user.refreshTokens.filter(rt => rt.token !== token);

    return sendTokens(res, user);
  } catch (e) {
    console.error('[Auth] refresh error:', e.message);
    res.status(500).json({ error: 'Token refresh failed.' });
  }
};

/* ─── POST /api/auth/logout ────────────────────────────────────────────────── */
exports.logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;

    if (token) {
      const payload = tokenService.verifyRefresh(token);
      await User.findByIdAndUpdate(payload.sub, {
        $pull: { refreshTokens: { token } },
      });
    }

    res.clearCookie('refreshToken', { path: '/api/auth' });
    res.json({ message: 'Logged out.' });
  } catch {
    // Even if verification fails, clear the cookie
    res.clearCookie('refreshToken', { path: '/api/auth' });
    res.json({ message: 'Logged out.' });
  }
};

/* ─── GET /api/auth/me ─────────────────────────────────────────────────────── */
exports.me = async (req, res) => {
  // req.user is set by the auth middleware
  const user = await User.findById(req.user.sub);
  if (!user) return res.status(404).json({ error: 'User not found.' });
  res.json(user.toSafeObject());
};
