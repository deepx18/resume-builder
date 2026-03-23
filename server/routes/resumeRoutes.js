const express     = require('express');
const router      = express.Router();
const ctrl        = require('../controllers/resumeController');
const requireAuth = require('../middleware/requireAuth');

// All resume routes require authentication
router.use(requireAuth);

router.get('/',        ctrl.getAll);
router.post('/',       ctrl.create);
router.get('/:id',     ctrl.getOne);
router.put('/:id',     ctrl.update);
router.delete('/:id',  ctrl.remove);
router.get('/:id/pdf', ctrl.exportPdf);

module.exports = router;
