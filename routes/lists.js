var express = require('express');
var router = express.Router();

router.get('/new', (req, res, next) => {
  res.render('listForm', { title: 'Create List' });
});

module.exports = router;
