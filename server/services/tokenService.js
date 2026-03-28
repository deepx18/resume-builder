const jwt = require('jsonwebtoken');

const ACCESS_SECRET  = process.env.JWT_ACCESS_SECRET  || 'change_me_access_secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'change_me_refresh_secret';
const ACCESS_TTL     = '15m';
const REFRESH_TTL    = '7d';

exports.signAccess = (user) =>
  jwt.sign(
    { sub: user._id.toString(), email: user.email, name: user.name },
    ACCESS_SECRET,
    { expiresIn: ACCESS_TTL }
  );

exports.signRefresh = (user) =>
  jwt.sign(
    { sub: user._id.toString() },
    REFRESH_SECRET,
    { expiresIn: REFRESH_TTL }
  );

exports.verifyAccess = (token) =>
  jwt.verify(token, ACCESS_SECRET);

exports.verifyRefresh = (token) =>
  jwt.verify(token, REFRESH_SECRET);

exports.refreshCookieOptions = () => ({
  httpOnly:  true,
  secure:    process.env.NODE_ENV === 'production',
  sameSite:  'strict',
  maxAge:    7 * 24 * 60 * 60 * 1000,
  path:      '/api/auth',
});
