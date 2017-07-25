var express = require('express');
var router = express.Router();

router.get('/new', (req, res) => {
  res.render('mentorNew');
});

module.exports = router;
