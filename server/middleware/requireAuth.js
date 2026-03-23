const tokenService = require('../services/tokenService');

/**
 * Protects any route that requires authentication.
 * Expects: Authorization: Bearer <accessToken>
 */
module.exports = function requireAuth(req, res, next) {
  const header = req.headers['authorization'];
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  const token = header.slice(7);
  try {
    req.user = tokenService.verifyAccess(token);
    next();
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Access token expired.', code: 'TOKEN_EXPIRED' });
    }
    return res.status(401).json({ error: 'Invalid access token.' });
  }
};
