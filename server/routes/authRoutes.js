const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/authController');
const requireAuth = require('../middleware/requireAuth');

router.post('/register', ctrl.register);
router.post('/login',    ctrl.login);
router.post('/google',   ctrl.googleAuth);
router.post('/refresh',  ctrl.refresh);
router.post('/logout',   ctrl.logout);
router.get('/me',        requireAuth, ctrl.me);

module.exports = router;
