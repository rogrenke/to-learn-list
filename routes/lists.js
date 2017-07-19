const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController')

router.get('/new', (req, res, next) => {
  res.render('listForm', { title: 'Create List' });
});

router.post('/new', listController.createList)

router.get('/', (req, res, next) => {
  res.render('lists', { title: 'Lists' })
})

module.exports = router;
