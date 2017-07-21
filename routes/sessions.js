var express = require('express');
var router = express.Router();
const sessionController = require('../controllers/sessionController');

router.get('/logout', sessionController.logout);

module.exports = router;
