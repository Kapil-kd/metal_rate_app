const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const purityCtrl = require('../Controllers/purityController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', purityCtrl.createPurity);
router.get('/', purityCtrl.getPurities);
router.put('/:id', purityCtrl.updatePurity);
router.delete('/:id', purityCtrl.deletePurity);

module.exports = router;
