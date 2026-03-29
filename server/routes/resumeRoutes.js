<<<<<<< HEAD
const express     = require('express');
const router      = express.Router();
const ctrl        = require('../controllers/resumeController');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);
=======
const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/resumeController');
>>>>>>> 1b585c7 (Ready, Set, Go!)

router.get('/',        ctrl.getAll);
router.post('/',       ctrl.create);
router.get('/:id',     ctrl.getOne);
router.put('/:id',     ctrl.update);
router.delete('/:id',  ctrl.remove);
router.get('/:id/pdf', ctrl.exportPdf);

module.exports = router;
