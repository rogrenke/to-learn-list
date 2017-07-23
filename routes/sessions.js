var express = require('express');
var router = express.Router();
const sessionController = require('../controllers/sessionController');

router.get('/signout', sessionController.signout);

router.get('/signin', sessionController.signinForm);

router.post('/', sessionController.signin);

module.exports = router;
