var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', userController.signupForm);

router.post('/', userController.validateRegister, userController.signup, sessionController.signin);

module.exports = router;
