var express = require('express');
var router = express.Router();
const sessionController = require('../controllers/sessionController');

router.get('/logout', sessionController.logout);

router.get('/signin', sessionController.signinForm);

router.post('/', sessionController.login);

module.exports = router;
