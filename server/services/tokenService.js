const jwt = require('jsonwebtoken');

const ACCESS_SECRET  = process.env.JWT_ACCESS_SECRET  || 'change_me_access_secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'change_me_refresh_secret';
const ACCESS_TTL     = '15m';
const REFRESH_TTL    = '7d';

/**
 * Sign a short-lived access token (15 min).
 */
exports.signAccess = (user) =>
  jwt.sign(
    { sub: user._id.toString(), email: user.email, name: user.name },
    ACCESS_SECRET,
    { expiresIn: ACCESS_TTL }
  );

/**
 * Sign a long-lived refresh token (7 days).
 */
exports.signRefresh = (user) =>
  jwt.sign(
    { sub: user._id.toString() },
    REFRESH_SECRET,
    { expiresIn: REFRESH_TTL }
  );

/**
 * Verify an access token. Returns decoded payload or throws.
 */
exports.verifyAccess = (token) =>
  jwt.verify(token, ACCESS_SECRET);

/**
 * Verify a refresh token. Returns decoded payload or throws.
 */
exports.verifyRefresh = (token) =>
  jwt.verify(token, REFRESH_SECRET);

/**
 * Cookie options for the refresh token.
 * httpOnly keeps it safe from XSS; sameSite=strict blocks CSRF.
 */
exports.refreshCookieOptions = () => ({
  httpOnly:  true,
  secure:    process.env.NODE_ENV === 'production',
  sameSite:  'strict',
  maxAge:    7 * 24 * 60 * 60 * 1000,   // 7 days in ms
  path:      '/api/auth',
});
