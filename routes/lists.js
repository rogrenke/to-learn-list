const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController')

router.get('/new', listController.createForm)

router.post('/new', listController.createList)

router.get('/', listController.getLists)

module.exports = router;
