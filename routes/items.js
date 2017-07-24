const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController')
const itemController = require('../controllers/itemController')



router.get('/edit', itemController.updateItem, listController.getListById)

router.get('/:id', itemController.getItemById)

module.exports = router;
