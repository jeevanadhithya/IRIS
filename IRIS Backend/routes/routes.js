const express = require('express');
const router = express.Router();
const callController = require('../controllers/callController');

router.post('/calluser', callController.callUser);

module.exports = router;
