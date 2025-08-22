const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/metalRateController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/latest', ctrl.getLatestRate);
router.post('/', ctrl.createRate);
router.get('/', ctrl.listRates);

module.exports = router;
