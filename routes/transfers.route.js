const transfersController = require('../controllers/transfers.controller');
const express = require('express');

const router = express.Router();

router.post('/', transfersController.transfer);

module.exports = router;
