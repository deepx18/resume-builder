const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/aiController');

router.post('/suggestions', ctrl.getSuggestions);
router.post('/improve',     ctrl.improveSummary);

module.exports = router;
