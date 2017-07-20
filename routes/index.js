const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ductu' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});


module.exports = router;
