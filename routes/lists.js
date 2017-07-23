const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController')
const itemController = require('../controllers/itemController')

router.get('/new', listController.createForm)

router.post('/new', listController.createList)

router.get('/', listController.getLists)

router.get('/:id', listController.getListById)

router.post('/:id', itemController.createItem, listController.getListById)

module.exports = router;